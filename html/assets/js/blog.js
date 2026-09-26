(() => {
 const posts=window.portfolioPosts||[];
 const text=(tag,value,className)=>{const el=document.createElement(tag);el.textContent=value;if(className)el.className=className;return el;};
 const minutes=post=>Math.max(1,Math.ceil(post.sections.map(s=>s.join(' ')).join(' ').split(/\s+/).length/200));
 function card(post){
  const el=document.createElement('article');el.className='blog-card';
  const link=document.createElement('a');link.href='blog-detail.html?article='+encodeURIComponent(post.slug);link.className='blog-card-link';
  const img=document.createElement('img');img.src=post.image;img.alt='';img.width=800;img.height=500;img.loading='lazy';
  const body=document.createElement('div');body.className='blog-card-body';
  body.append(text('span',post.category+' / '+minutes(post)+' min read','eyebrow'),text('h2',post.title),text('p',post.excerpt),text('span','Read article ?','text-link'));
  link.append(img,body);el.append(link);return el;
 }
 const list=document.getElementById('blog-list');
 if(list){function render(category){const selected=posts.filter(p=>category==='All'||p.category===category);list.replaceChildren(...selected.map(card));document.getElementById('article-count').textContent=selected.length+' articles';}
 document.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-category]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));render(button.dataset.category);}));render('All');return;}
 const slug=new URLSearchParams(location.search).get('article')||posts[0]?.slug;
 const post=posts.find(p=>p.slug===slug);
 if(!post){document.getElementById('article-missing').hidden=false;document.getElementById('article-title').textContent='Article not found.';document.title='Article not found | Ashish Sharma';return;}
 document.title=post.title+' | Ashish Sharma';document.querySelector('meta[name=description]').content=post.excerpt;
 for(const [id,value] of [['article-title',post.title],['article-crumb',post.title],['article-category',post.category],['article-excerpt',post.excerpt],['reading-time',minutes(post)+' min read']])document.getElementById(id).textContent=value;
 const image=document.getElementById('article-image');image.src=post.image;image.alt='';
 const body=document.getElementById('article-body'),toc=document.getElementById('article-toc');
 post.sections.forEach(([heading,copy],index)=>{const section=document.createElement('section');section.id='section-'+(index+1);section.append(text('h2',heading),text('p',copy));body.append(section);const link=text('a',heading);link.href='#'+section.id;toc.append(link);});
 document.getElementById('related-articles').replaceChildren(...posts.filter(p=>p.slug!==slug).map(card));document.getElementById('article-content').hidden=false;
})();
