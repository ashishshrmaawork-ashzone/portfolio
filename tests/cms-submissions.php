<?php
// Isolated contract tests: fake WordPress storage and mail; no real email is sent.
define('ABSPATH', __DIR__); define('MINUTE_IN_SECONDS',60);
function add_action(...$args) {}
function sanitize_text_field($v) { return strip_tags($v); }
function sanitize_textarea_field($v) { return strip_tags($v); }
function sanitize_email($v) { return filter_var($v,FILTER_SANITIZE_EMAIL); }
function is_email($v) { return filter_var($v,FILTER_VALIDATE_EMAIL); }
function wp_parse_args($a,$b) { return array_merge($b,$a); }
function get_option(...$args) { return array(); }
function get_transient($k) { return $GLOBALS['rates'][$k] ?? 0; }
function set_transient($k,$v,$t) { $GLOBALS['rates'][$k]=$v; }
class WP_Error { public $code; function __construct($code,...$rest) { $this->code=$code; } function get_error_message(){return $this->code;} }
class WP_REST_Request { private $data; function __construct($d){$this->data=$d;} function get_param($k){return $this->data[$k]??null;} }
function is_wp_error($v) { return $v instanceof WP_Error; }
function wp_insert_post($data,$error) { if($GLOBALS['storage_failed']??false) return new WP_Error('db_failure'); $id=count($GLOBALS['posts'])+1; $GLOBALS['posts'][$id]=(object)$data; return $id; }
function update_post_meta($id,$k,$v){$GLOBALS['meta'][$id][$k]=$v;}
function get_post_meta($id,$k,$single){return $GLOBALS['meta'][$id][$k]??'';}
function get_post($id){return $GLOBALS['posts'][$id]??null;}
function wp_mail($to,$subject,$body,$headers){$GLOBALS['mail'][]=compact('to','subject','body','headers');return $GLOBALS['mail_ok'];}
function wp_next_scheduled($hook,$args){return false;}
function wp_schedule_single_event($time,$hook,$args){$GLOBALS['jobs'][]=$args;}
function rest_ensure_response($v){return $v;}
function check($value,$message){if(!$value)throw new Exception($message);}
require __DIR__.'/../wordpress-plugin/ashish-portfolio-cms/ashish-portfolio-cms.php';
$GLOBALS['posts']=array();$GLOBALS['mail']=array();$GLOBALS['mail_ok']=true;
$data=array('name'=>'Test','email'=>'test@example.com','phone'=>'123','subject'=>'New site','message'=>'Details','type'=>'contact');
$result=ashish_portfolio_cms_save_message(new WP_REST_Request($data));
check($result['success']===true,'Contact succeeds');check(count($GLOBALS['posts'])===1,'Saved to storage');check($GLOBALS['posts'][1]->post_status==='private','Private record');
check($GLOBALS['mail'][0]['to']==='ashishshrmaa@outlook.com','Correct recipient');check($GLOBALS['mail'][0]['headers']===array('Reply-To: test@example.com'),'Reply-To');
$GLOBALS['mail_ok']=false;$data['type']='quote';
$result=ashish_portfolio_cms_save_message(new WP_REST_Request($data));check($result['success'] && $result['notification']==='pending','Mail failure preserves successful storage');
check(count($GLOBALS['posts'])===2,'Quote saved');check(get_post_meta(2,'_portfolio_enquiry_type',true)==='Quote request','Quote type');check(count($GLOBALS['jobs'])===1,'Retry scheduled');
$GLOBALS['mail_ok']=true;ashish_portfolio_cms_notify(2);check(get_post_meta(2,'_portfolio_email_status',true)==='accepted','Retry succeeds');
$count=count($GLOBALS['mail']);ashish_portfolio_cms_notify(2);check(count($GLOBALS['mail'])===$count,'Accepted notification not sent twice');
$GLOBALS['storage_failed']=true;$result=ashish_portfolio_cms_save_message(new WP_REST_Request($data));check(is_wp_error($result),'Database failure rejected');check(count($GLOBALS['mail'])===$count,'No email before persistence');$GLOBALS['storage_failed']=false;
$data['email']='bad';check(is_wp_error(ashish_portfolio_cms_save_message(new WP_REST_Request($data))),'Bad email rejected');
$data['email']='retry@example.com';$GLOBALS['mail_ok']=false;ashish_portfolio_cms_save_message(new WP_REST_Request($data));
for($i=0;$i<3;$i++)ashish_portfolio_cms_notify(3);
check(get_post_meta(3,'_portfolio_email_status',true)==='failed','Failed state after retry limit');
echo "PASS persistence, contact/quote, recipient, mail failure/retry, database failure, validation\n";
