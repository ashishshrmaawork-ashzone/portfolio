import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { HomepageScripts } from "@/components/homepage-scripts";

export function Homepage() {
  return (
    <>
      <SiteHeader />
      <main className="main-page-wrapper">
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <ResumeSection />
        <TestimonialsSection />
        <ContactSection />
        <HomepageDecorations />
      </main>
      <SiteFooter className="rn-footer-area rn-section-gap section-separator" />
      <QuoteModal />
      <HomepageScripts />
    </>
  );
}

function HeroSection() {
  return (
<div id="home" className="rn-slider-area">
      {" "}
      <div className="slide slider-style-1">
        {" "}
        <div className="container">
          {" "}
          <div className="row row--30 align-items-center">
            {" "}
            <div className="order-2 order-lg-1 col-lg-7 mt_md--50 mt_sm--50 mt_lg--30">
              {" "}
              <div className="content">
                {" "}
                <div className="inner">
                  {" "}
                  <span className="subtitle">
                    {"Welcome to my world"}
                  </span>
                  {" "}
                  <h1 className="title">
                    {"Hi, I’m "}
                    <span>
                      {"Ashish Sharma"}
                    </span>
                    <br />
                    {" "}
                    <span className="header-caption" id="page-top">
                      {" "}
                      {" "}
                      <span className="cd-headline clip is-full-width">
                        {" "}
                        <span>
                          {"a "}
                        </span>
                        {" "}
                        {" "}
                        <span className="cd-words-wrapper" style={{ "width": "279.812px" }}>
                          {" "}
                          <b className="is-visible">
                            {"Developer."}
                          </b>
                          {" "}
                          <b className="is-hidden">
                            {"Professional Coder."}
                          </b>
                          {" "}
                          <b className="is-hidden">
                            {"Web Developer."}
                          </b>
                          {" "}
                        </span>
                        {" "}
                      </span>
                      {" "}
                      {" "}
                    </span>
                    {" "}
                  </h1>
                  {" "}
                  <div>
                    {" "}
                    <p className="description" id="about">
                      {"I build reliable digital experiences across PHP, WordPress,\r\n                                            JavaScript, React, Next.js and server handling — from a clean interface to a\r\n                                            dependable deployment."}
                    </p>
                    {" "}
                  </div>
                  {" "}
                  <div className="dev-terminal" aria-label="Developer status">
                    {" "}
                    <div className="dev-terminal-bar">
                      <span />
                      <span />
                      <span />
                      <code>
                        {"ashish@dev:~"}
                      </code>
                    </div>
                    {" "}
                    <div className="dev-terminal-line">
                      <b>
                        {"$"}
                      </b>
                      {" "}
                      <span>
                        {"build"}
                      </span>
                      {" "}
                      <em>
                        {"--fast --secure --scalable"}
                      </em>
                    </div>
                    {" "}
                    <div className="dev-terminal-line success">
                      <b>
                        {"✓"}
                      </b>
                      {" ready for your next project"}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <div className="hero-actions">
                    {" "}
                    <a className="rn-btn" href="#portfolio">
                      <span>
                        {"View my work"}
                      </span>
                      <i className="feather-arrow-up-right" />
                    </a>
                    {" "}
                    <a className="hero-text-link" href="#contacts">
                      {"Start a project "}
                      <i className="feather-arrow-right" />
                    </a>
                    {" "}
                  </div>
                  {" "}
                  <div className="hero-proof">
                    {" "}
                    <div>
                      <strong>
                        {"10+"}
                      </strong>
                      <span>
                        {"Years experience"}
                      </span>
                    </div>
                    {" "}
                    <div>
                      <strong>
                        {"50+"}
                      </strong>
                      <span>
                        {"Projects delivered"}
                      </span>
                    </div>
                    {" "}
                    <div>
                      <strong>
                        {"24/7"}
                      </strong>
                      <span>
                        {"Technical support"}
                      </span>
                    </div>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
                <div className="row">
                  {" "}
                  <div className="col-lg-6 col-xl-6 col-md-6 col-sm-6 col-12">
                    {" "}
                    <div className="social-share-inner-left hero-connect">
                      {" "}
                      <span className="title">
                        {"Let's connect"}
                      </span>
                      {" "}
                      <ul className="social-share d-flex liststyle">
                        {" "}
                        <li className="facebook">
                          <a href="#" aria-label="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook">
                              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                            <span>
                              {"Facebook"}
                            </span>
                          </a>
                          {" "}
                        </li>
                        {" "}
                        <li className="instagram">
                          <a href="#" aria-label="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram">
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                            </svg>
                            <span>
                              {"Instagram"}
                            </span>
                          </a>
                          {" "}
                        </li>
                        {" "}
                        <li className="linkedin">
                          <a href="#" aria-label="LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin">
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                              <rect x="2" y="9" width="4" height="12" />
                              <circle cx="4" cy="4" r="2" />
                            </svg>
                            <span>
                              {"LinkedIn"}
                            </span>
                          </a>
                          {" "}
                        </li>
                      </ul>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            <div className="order-1 order-lg-2 col-lg-5">
              {" "}
              <div className="thumbnail">
                {" "}
                <div className="inner">
                  {" "}
                  <img src="assets/images/tech-stack.svg" alt="Digital operations expertise: website development, server handling, performance optimization, SEO, security, deployment, backup, analytics and maintenance" />
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </div>
      {" "}
    </div>
  );
}
function ServicesSection() {
  return (
<div className="rn-service-area rn-section-gap section-separator" id="features">
      {" "}
      <div className="container">
        {" "}
        <div className="tech-float-layer" aria-hidden="true">
          {" "}
          <span className="tech-chip tech-chip-php">
            {"PHP"}
          </span>
          {" "}
          <span className="tech-chip tech-chip-js">
            {"JS"}
          </span>
          {" "}
          <span className="tech-chip tech-chip-html">
            {"HTML"}
          </span>
          {" "}
          <span className="tech-chip tech-chip-react">
            {"React"}
          </span>
          {" "}
          <span className="tech-chip tech-chip-next">
            {"Next.js"}
          </span>
          {" "}
          <span className="tech-chip tech-chip-laravel">
            {"Laravel"}
          </span>
          {" "}
          <span className="tech-chip tech-chip-api">
            {"API"}
          </span>
          {" "}
          <span className="tech-chip tech-chip-sql">
            {"SQL"}
          </span>
          {" "}
        </div>
        {" "}
        <div className="row">
          {" "}
          <div className="col-lg-12">
            {" "}
            <div className="section-title text-left aos-init aos-animate" data-aos="fade-up" data-aos-duration="500" data-aos-delay="100" data-aos-once="true">
              {" "}
              <span className="subtitle">
                {"Features"}
              </span>
              {" "}
              <h2 className="title">
                {"What I Do"}
              </h2>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
        <div className="row row--25 mt_md--10 mt_sm--10">
          {" "}
          {" "}
          <div data-aos="fade-up" data-aos-duration="500" data-aos-delay="100" data-aos-once="true" className="col-lg-6 col-xl-4 col-md-6 col-sm-12 col-12 mt--50 mt_md--30 mt_sm--30 aos-init aos-animate">
            {" "}
            <div className="rn-service">
              {" "}
              <div className="inner">
                {" "}
                <div className="icon">
                  {" "}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {" "}
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    {" "}
                    <line x1="3" y1="9" x2="21" y2="9" />
                    {" "}
                    <line x1="9" y1="21" x2="9" y2="9" />
                    {" "}
                  </svg>
                  {" "}
                </div>
                {" "}
                <div className="content">
                  {" "}
                  <h4 className="title">
                    <a href="#">
                      {"Frontend Development"}
                    </a>
                  </h4>
                  {" "}
                  <p className="description">
                    {"React, Next.js, JavaScript, HTML, CSS, Tailwind CSS."}
                  </p>
                  {" "}
                  <a className="read-more-button" href="#">
                    <i className="feather-arrow-right" />
                  </a>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <a className="over-link" href="#" />
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          {" "}
          {" "}
          <div data-aos="fade-up" data-aos-duration="500" data-aos-delay="300" data-aos-once="true" className="col-lg-6 col-xl-4 col-md-6 col-sm-12 col-12 mt--50 mt_md--30 mt_sm--30 aos-init aos-animate">
            {" "}
            <div className="rn-service">
              {" "}
              <div className="inner">
                {" "}
                <div className="icon">
                  {" "}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {" "}
                    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                    {" "}
                    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                    {" "}
                    <line x1="6" y1="6" x2="6.01" y2="6" />
                    {" "}
                    <line x1="6" y1="18" x2="6.01" y2="18" />
                    {" "}
                  </svg>
                  {" "}
                </div>
                {" "}
                <div className="content">
                  {" "}
                  <h4 className="title">
                    <a href="#">
                      {"Backend Development"}
                    </a>
                  </h4>
                  {" "}
                  <p className="description">
                    {"Node.js, Express.js, PHP, MVC, SQL, CMS, NoSQL, API."}
                  </p>
                  {" "}
                  <a className="read-more-button" href="#">
                    <i className="feather-arrow-right" />
                  </a>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <a className="over-link" href="#" />
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          {" "}
          {" "}
          <div data-aos="fade-up" data-aos-duration="500" data-aos-delay="500" data-aos-once="true" className="col-lg-6 col-xl-4 col-md-6 col-sm-12 col-12 mt--50 mt_md--30 mt_sm--30 aos-init aos-animate">
            {" "}
            <div className="rn-service">
              {" "}
              <div className="inner">
                {" "}
                <div className="icon">
                  {" "}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {" "}
                    <circle cx="9" cy="21" r="1" />
                    {" "}
                    <circle cx="20" cy="21" r="1" />
                    {" "}
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    {" "}
                  </svg>
                  {" "}
                </div>
                {" "}
                <div className="content">
                  {" "}
                  <h4 className="title">
                    <a href="#">
                      {"E-Commerce Development"}
                    </a>
                  </h4>
                  {" "}
                  <p className="description">
                    {"WooCommerce, Shopify, custom online stores."}
                  </p>
                  {" "}
                  <a className="read-more-button" href="#">
                    <i className="feather-arrow-right" />
                  </a>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <a className="over-link" href="#" />
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          {" "}
          {" "}
          <div data-aos="fade-up" data-aos-duration="500" data-aos-delay="100" data-aos-once="true" className="col-lg-6 col-xl-4 col-md-6 col-sm-12 col-12 mt--50 mt_md--30 mt_sm--30 aos-init aos-animate">
            {" "}
            <div className="rn-service">
              {" "}
              <div className="inner">
                {" "}
                <div className="icon">
                  {" "}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {" "}
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    {" "}
                  </svg>
                  {" "}
                </div>
                {" "}
                <div className="content">
                  {" "}
                  <h4 className="title">
                    <a href="#">
                      {"Performance Optimization"}
                    </a>
                  </h4>
                  {" "}
                  <p className="description">
                    {"Speed, SEO, Core Web Vitals improvements.\r\n                                    "}
                  </p>
                  {" "}
                  <a className="read-more-button" href="#">
                    <i className="feather-arrow-right" />
                  </a>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <a className="over-link" href="#" />
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          {" "}
          {" "}
          <div data-aos="fade-up" data-aos-duration="500" data-aos-delay="300" data-aos-once="true" className="col-lg-6 col-xl-4 col-md-6 col-sm-12 col-12 mt--50 mt_md--30 mt_sm--30 aos-init aos-animate">
            {" "}
            <div className="rn-service">
              {" "}
              <div className="inner">
                {" "}
                <div className="icon">
                  {" "}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {" "}
                    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-3 3-3-3 3-3z" />
                    {" "}
                  </svg>
                  {" "}
                </div>
                {" "}
                <div className="content">
                  {" "}
                  <h4 className="title">
                    <a href="#">
                      {"Website Maintenance"}
                    </a>
                  </h4>
                  {" "}
                  <p className="description">
                    {"Updates, security, bug fixes"}
                  </p>
                  {" "}
                  <a className="read-more-button" href="#">
                    <i className="feather-arrow-right" />
                  </a>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <a className="over-link" href="#" />
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          {" "}
          {" "}
          <div data-aos="fade-up" data-aos-duration="500" data-aos-delay="500" data-aos-once="true" className="col-lg-6 col-xl-4 col-md-6 col-sm-12 col-12 mt--50 mt_md--30 mt_sm--30 aos-init aos-animate">
            {" "}
            <div className="rn-service">
              {" "}
              <div className="inner">
                {" "}
                <div className="icon">
                  {" "}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {" "}
                    <line x1="22" y1="12" x2="2" y2="12" />
                    {" "}
                    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                    {" "}
                    <line x1="6" y1="16" x2="6.01" y2="16" />
                    {" "}
                    <line x1="10" y1="16" x2="10.01" y2="16" />
                    {" "}
                  </svg>
                  {" "}
                </div>
                {" "}
                <div className="content">
                  {" "}
                  <h4 className="title">
                    <a href="#">
                      {"Server Management"}
                    </a>
                  </h4>
                  {" "}
                  <p className="description">
                    {"Hosting, SSL, Deployment, Backups"}
                  </p>
                  {" "}
                  <a className="read-more-button" href="#">
                    <i className="feather-arrow-right" />
                  </a>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <a className="over-link" href="#" />
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          {" "}
        </div>
        {" "}
      </div>
      {" "}
    </div>
  );
}
function PortfolioSection() {
  return (
<div className="rn-portfolio-area rn-section-gap section-separator" id="portfolio">
      {" "}
      <div className="container">
        {" "}
        <div className="portfolio-tech-panel" aria-hidden="true">
          {" "}
          <span className="portfolio-code-line">
            <b>
              {"const"}
            </b>
            {" projects = ["}
          </span>
          {" "}
          <span className="portfolio-code-line portfolio-code-indent">
            {"'web', 'apps', 'scalable-api'"}
          </span>
          {" "}
          <span className="portfolio-code-line">
            {"];"}
          </span>
          {" "}
        </div>
        {" "}
        <div className="portfolio-tech-badges" aria-hidden="true">
          {" "}
          <span>
            {"PHP"}
          </span>
          {" "}
          <span>
            {"JS"}
          </span>
          {" "}
          <span>
            {"HTML"}
          </span>
          {" "}
          <span>
            {"React"}
          </span>
          {" "}
          <span>
            {"API"}
          </span>
          {" "}
        </div>
        {" "}
        <div className="row">
          {" "}
          <div className="col-lg-12">
            {" "}
            <div className="section-title text-center">
              {" "}
              <span className="subtitle">
                {"Visit my portfolio and keep your feedback"}
              </span>
              {" "}
              <h2 className="title">
                {"My Portfolio"}
              </h2>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
        <div className="row row--25 mt--10 mt_md--10 mt_sm--10">
          {" "}
          {" "}
          <div data-aos="fade-up" data-aos-delay="100" data-aos-once="true" className="col-lg-6 col-xl-4 col-md-6 col-12 mt--50 mt_md--30 mt_sm--30 aos-init aos-animate">
            {" "}
            <div className="rn-portfolio" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
              {" "}
              <div className="inner">
                {" "}
                <div className="thumbnail">
                  {" "}
                  <a href="javascript:void(0)">
                    {" "}
                    <img src="assets/images/portfolio-01.jpg" alt="Personal Portfolio Images" />
                    {" "}
                  </a>
                  {" "}
                </div>
                {" "}
                <div className="content">
                  {" "}
                  <div className="category-info">
                    {" "}
                    <div className="category-list">
                      {" "}
                      <a href="javascript:void(0)">
                        {"Development"}
                      </a>
                      {" "}
                    </div>
                    {" "}
                    <div className="meta">
                      {" "}
                      <span>
                        <a href="javascript:void(0)">
                          <i className="feather-heart" />
                        </a>
                        {"\r\n                                        600"}
                      </span>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <h4 className="title">
                    <a href="javascript:void(0)">
                      {"The services provide for design "}
                      <i className="feather-arrow-up-right" />
                    </a>
                  </h4>
                  {" "}
                  <a className="project-details-link" href="project-details.html?project=project-1">
                    {"Read more "}
                    <span aria-hidden="true">
                      {"↗"}
                    </span>
                  </a>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          {" "}
          {" "}
          <div data-aos="fade-up" data-aos-delay="300" data-aos-once="true" className="col-lg-6 col-xl-4 col-md-6 col-12 mt--50 mt_md--30 mt_sm--30 aos-init aos-animate">
            {" "}
            <div className="rn-portfolio" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
              {" "}
              <div className="inner">
                {" "}
                <div className="thumbnail">
                  {" "}
                  <a href="javascript:void(0)">
                    {" "}
                    <img src="assets/images/portfolio-02.jpg" alt="Personal Portfolio Images" />
                    {" "}
                  </a>
                  {" "}
                </div>
                {" "}
                <div className="content">
                  {" "}
                  <div className="category-info">
                    {" "}
                    <div className="category-list">
                      {" "}
                      <a href="javascript:void(0)">
                        {"Application"}
                      </a>
                      {" "}
                    </div>
                    {" "}
                    <div className="meta">
                      {" "}
                      <span>
                        <a href="javascript:void(0)">
                          <i className="feather-heart" />
                        </a>
                        {"\r\n                                        750"}
                      </span>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <h4 className="title">
                    <a href="javascript:void(0)">
                      {"Mobile app landing design & app\r\n                                            maintain"}
                      <i className="feather-arrow-up-right" />
                    </a>
                  </h4>
                  {" "}
                  <a className="project-details-link" href="project-details.html?project=project-2">
                    {"Read more "}
                    <span aria-hidden="true">
                      {"↗"}
                    </span>
                  </a>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          {" "}
          {" "}
          <div data-aos="fade-up" data-aos-delay="500" data-aos-once="true" className="col-lg-6 col-xl-4 col-md-6 col-12 mt--50 mt_md--30 mt_sm--30 aos-init aos-animate">
            {" "}
            <div className="rn-portfolio" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
              {" "}
              <div className="inner">
                {" "}
                <div className="thumbnail">
                  {" "}
                  <a href="javascript:void(0)">
                    {" "}
                    <img src="assets/images/portfolio-03.jpg" alt="Personal Portfolio Images" />
                    {" "}
                  </a>
                  {" "}
                </div>
                {" "}
                <div className="content">
                  {" "}
                  <div className="category-info">
                    {" "}
                    <div className="category-list">
                      {" "}
                      <a href="javascript:void(0)">
                        {"Photoshop"}
                      </a>
                      {" "}
                    </div>
                    {" "}
                    <div className="meta">
                      {" "}
                      <span>
                        <a href="javascript:void(0)">
                          <i className="feather-heart" />
                        </a>
                        {"\r\n                                        630"}
                      </span>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <h4 className="title">
                    <a href="javascript:void(0)">
                      {"Logo design creativity & Application\r\n                                            "}
                      <i className="feather-arrow-up-right" />
                    </a>
                  </h4>
                  {" "}
                  <a className="project-details-link" href="project-details.html?project=project-3">
                    {"Read more "}
                    <span aria-hidden="true">
                      {"↗"}
                    </span>
                  </a>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          {" "}
          {" "}
          <div data-aos="fade-up" data-aos-delay="100" data-aos-once="true" className="col-lg-6 col-xl-4 col-md-6 col-12 mt--50 mt_md--30 mt_sm--30 aos-init aos-animate">
            {" "}
            <div className="rn-portfolio" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
              {" "}
              <div className="inner">
                {" "}
                <div className="thumbnail">
                  {" "}
                  <a href="javascript:void(0)">
                    {" "}
                    <img src="assets/images/portfolio-04.jpg" alt="Personal Portfolio Images" />
                    {" "}
                  </a>
                  {" "}
                </div>
                {" "}
                <div className="content">
                  {" "}
                  <div className="category-info">
                    {" "}
                    <div className="category-list">
                      {" "}
                      <a href="javascript:void(0)">
                        {"Figma"}
                      </a>
                      {" "}
                    </div>
                    {" "}
                    <div className="meta">
                      {" "}
                      <span>
                        <a href="javascript:void(0)">
                          <i className="feather-heart" />
                        </a>
                        {"\r\n                                        360"}
                      </span>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <h4 className="title">
                    <a href="javascript:void(0)">
                      {"Mobile app landing design &\r\n                                            Services"}
                      <i className="feather-arrow-up-right" />
                    </a>
                  </h4>
                  {" "}
                  <a className="project-details-link" href="project-details.html?project=project-4">
                    {"Read more "}
                    <span aria-hidden="true">
                      {"↗"}
                    </span>
                  </a>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          {" "}
          {" "}
          <div data-aos="fade-up" data-aos-delay="300" data-aos-once="true" className="col-lg-6 col-xl-4 col-md-6 col-12 mt--50 mt_md--30 mt_sm--30 aos-init aos-animate">
            {" "}
            <div className="rn-portfolio" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
              {" "}
              <div className="inner">
                {" "}
                <div className="thumbnail">
                  {" "}
                  <a href="javascript:void(0)">
                    {" "}
                    <img src="assets/images/portfolio-05.jpg" alt="Personal Portfolio Images" />
                    {" "}
                  </a>
                  {" "}
                </div>
                {" "}
                <div className="content">
                  {" "}
                  <div className="category-info">
                    {" "}
                    <div className="category-list">
                      {" "}
                      <a href="javascript:void(0)">
                        {"Web Design"}
                      </a>
                      {" "}
                    </div>
                    {" "}
                    <div className="meta">
                      {" "}
                      <span>
                        <a href="javascript:void(0)">
                          <i className="feather-heart" />
                        </a>
                        {"\r\n                                        280"}
                      </span>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <h4 className="title">
                    <a href="javascript:void(0)">
                      {"Design for tecnology & services"}
                      <i className="feather-arrow-up-right" />
                    </a>
                  </h4>
                  {" "}
                  <a className="project-details-link" href="project-details.html?project=project-5">
                    {"Read more "}
                    <span aria-hidden="true">
                      {"↗"}
                    </span>
                  </a>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          {" "}
          {" "}
          <div data-aos="fade-up" data-aos-delay="500" data-aos-once="true" className="col-lg-6 col-xl-4 col-md-6 col-12 mt--50 mt_md--30 mt_sm--30 aos-init aos-animate">
            {" "}
            <div className="rn-portfolio" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
              {" "}
              <div className="inner">
                {" "}
                <div className="thumbnail">
                  {" "}
                  <a href="javascript:void(0)">
                    {" "}
                    <img src="assets/images/portfolio-06.jpg" alt="Personal Portfolio Images" />
                    {" "}
                  </a>
                  {" "}
                </div>
                {" "}
                <div className="content">
                  {" "}
                  <div className="category-info">
                    {" "}
                    <div className="category-list">
                      {" "}
                      <a href="javascript:void(0)">
                        {"Web Design"}
                      </a>
                      {" "}
                    </div>
                    {" "}
                    <div className="meta">
                      {" "}
                      <span>
                        <a href="javascript:void(0)">
                          <i className="feather-heart" />
                        </a>
                        {"\r\n                                        690"}
                      </span>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <h4 className="title">
                    <a href="javascript:void(0)">
                      {"App for tecnology & services"}
                      <i className="feather-arrow-up-right" />
                    </a>
                  </h4>
                  {" "}
                  <a className="project-details-link" href="project-details.html?project=project-6">
                    {"Read more "}
                    <span aria-hidden="true">
                      {"↗"}
                    </span>
                  </a>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          {" "}
        </div>
        {" "}
        <div className="portfolio-view-more">
          <a className="rn-btn" href="portfolio.html">
            {"View more "}
            <span aria-hidden="true">
              {"↗"}
            </span>
          </a>
        </div>
        {" "}
      </div>
      {" "}
    </div>
  );
}
function ResumeSection() {
  return (
<div className="rn-resume-area rn-section-gap section-separator" id="resume">
      {" "}
      <div className="container">
        {" "}
        <div className="row">
          {" "}
          <div className="col-lg-12">
            {" "}
            <div className="section-title text-center">
              {" "}
              <span className="subtitle">
                {"10+ Years of Experience"}
              </span>
              {" "}
              <h2 className="title">
                {"My Resume"}
              </h2>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
        <div className="row mt--45">
          {" "}
          <div className="col-lg-12">
            {" "}
            <ul className="rn-nav-list nav nav-tabs" id="myTabs" role="tablist">
              {" "}
              <li className="nav-item">
                {" "}
                <a className="nav-link active" id="professional-tab" data-bs-toggle="tab" href="#professional" role="tab" aria-controls="professional" aria-selected="true">
                  {"Work Experience"}
                </a>
                {" "}
              </li>
              {" "}
              <li className="nav-item">
                {" "}
                <a className="nav-link " id="education-tab" data-bs-toggle="tab" href="#education" role="tab" aria-controls="education" aria-selected="false">
                  {"Education"}
                </a>
                {" "}
              </li>
              {" "}
              {" "}
            </ul>
            {" "}
            {" "}
            <div className="rn-nav-content tab-content" id="myTabContents">
              {" "}
              {" "}
              <div className="tab-pane fade show active" id="professional" role="tabpanel" aria-labelledby="professional-tab">
                {" "}
                <div className="personal-experience-inner mt--40">
                  {" "}
                  <div className="row">
                    {" "}
                    {" "}
                    <div className="col-lg-6 col-md-12 col-12">
                      {" "}
                      <div className="content">
                        {" "}
                        <div className="experience-list">
                          {" "}
                          {" "}
                          <div className="resume-single-list">
                            {" "}
                            <div className="inner">
                              {" "}
                              <div className="heading">
                                {" "}
                                <div className="title">
                                  {" "}
                                  <h4>
                                    {"Sparkle Software Solutions Private Limited"}
                                  </h4>
                                  {" "}
                                  <span>
                                    {"May 2025 - Present"}
                                  </span>
                                  {" "}
                                </div>
                                {" "}
                                {" "}
                              </div>
                              {" "}
                              <p className="description">
                                {"The education should be very\r\n                                                                interactual. Ut tincidunt est ac dolor aliquam sodales.\r\n                                                                Phasellus sed mauris hendrerit, laoreet sem in, lobortis\r\n                                                                mauris hendrerit ante."}
                              </p>
                              {" "}
                            </div>
                            {" "}
                          </div>
                          {" "}
                          {" "}
                          {" "}
                          <div className="resume-single-list">
                            {" "}
                            <div className="inner">
                              {" "}
                              <div className="heading">
                                {" "}
                                <div className="title">
                                  {" "}
                                  <h4>
                                    {"Reinvent Digital Media Pvt Ltd"}
                                  </h4>
                                  {" "}
                                  <span>
                                    {"Team Leader & Full Stack Developer (2023-2025)"}
                                  </span>
                                  {" "}
                                </div>
                                {" "}
                                {" "}
                              </div>
                              {" "}
                              <p className="description">
                                {"Maecenas finibus nec sem ut\r\n                                                                imperdiet. Ut tincidunt est ac dolor aliquam sodales.\r\n                                                                Phasellus sed mauris hendrerit, laoreet sem in, lobortis\r\n                                                                mauris hendrerit ante."}
                              </p>
                              {" "}
                            </div>
                            {" "}
                          </div>
                          {" "}
                          {" "}
                          {" "}
                          <div className="resume-single-list">
                            {" "}
                            <div className="inner">
                              {" "}
                              <div className="heading">
                                {" "}
                                <div className="title">
                                  {" "}
                                  <h4>
                                    {"Rewathi Innovations Pvt Ltd"}
                                  </h4>
                                  {" "}
                                  <span>
                                    {"Full Stack Developer (2021 - 2023)"}
                                  </span>
                                  {" "}
                                </div>
                                {" "}
                                {" "}
                              </div>
                              {" "}
                              <p className="description">
                                {" If you are going to use a passage.\r\n                                                                Ut tincidunt est ac dolor aliquam sodales.\r\n                                                                Phasellus sed mauris hendrerit, laoreet sem in, lobortis\r\n                                                                mauris hendrerit ante."}
                              </p>
                              {" "}
                            </div>
                            {" "}
                          </div>
                          {" "}
                          {" "}
                        </div>
                        {" "}
                      </div>
                      {" "}
                    </div>
                    {" "}
                    {" "}
                    {" "}
                    <div className="col-lg-6 col-md-12 col-12 mt_md--60 mt_sm--60">
                      {" "}
                      <div className="content">
                        {" "}
                        <div className="experience-list">
                          {" "}
                          {" "}
                          <div className="resume-single-list">
                            {" "}
                            <div className="inner">
                              {" "}
                              <div className="heading">
                                {" "}
                                <div className="title">
                                  {" "}
                                  <h4>
                                    {"3iLogics Pvt Ltd"}
                                  </h4>
                                  {" "}
                                  <span>
                                    {"Backend Developer & Researcher (Mar, 2018 - 2021)"}
                                  </span>
                                  {" "}
                                </div>
                                {" "}
                                {" "}
                              </div>
                              {" "}
                              <p className="description">
                                {"Contrary to popular belief. Ut\r\n                                                                tincidunt est ac dolor aliquam sodales.\r\n                                                                Phasellus sed mauris hendrerit, laoreet sem in, lobortis\r\n                                                                mauris hendrerit ante."}
                              </p>
                              {" "}
                            </div>
                            {" "}
                          </div>
                          {" "}
                          {" "}
                          {" "}
                          <div className="resume-single-list">
                            {" "}
                            <div className="inner">
                              {" "}
                              <div className="heading">
                                {" "}
                                <div className="title">
                                  {" "}
                                  <h4>
                                    {"RG Infotech Pvt Ltd"}
                                  </h4>
                                  {" "}
                                  <span>
                                    {"Junior Developer (2015-2018)"}
                                  </span>
                                  {" "}
                                </div>
                                {" "}
                                {" "}
                              </div>
                              {" "}
                              <p className="description">
                                {"Generate Lorem Ipsum which looks. Ut\r\n                                                                tincidunt est ac dolor aliquam sodales.\r\n                                                                Phasellus sed mauris hendrerit, laoreet sem in, lobortis\r\n                                                                mauris hendrerit ante."}
                              </p>
                              {" "}
                            </div>
                            {" "}
                          </div>
                          {" "}
                        </div>
                        {" "}
                      </div>
                      {" "}
                    </div>
                    {" "}
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <div className="tab-pane show  fade single-tab-area" id="education" role="tabpanel" aria-labelledby="education-tab">
                {" "}
                <div className="personal-experience-inner mt--40">
                  {" "}
                  <div className="row">
                    {" "}
                    {" "}
                    <div className="col-lg-6 col-md-12 col-12">
                      {" "}
                      <div className="content">
                        {" "}
                        <div className="experience-list">
                          {" "}
                          <div className="resume-single-list">
                            {" "}
                            <div className="inner">
                              {" "}
                              <div className="heading">
                                {" "}
                                <div className="title">
                                  {" "}
                                  <h4>
                                    {"Mern Stack Development"}
                                  </h4>
                                  {" "}
                                  <span>
                                    {"Unacademy.in (2024-2025)"}
                                  </span>
                                  {" "}
                                </div>
                                {" "}
                                {" "}
                              </div>
                              {" "}
                              <p className="description">
                                {"Maecenas finibus nec sem ut\r\n                                                                imperdiet. Ut tincidunt est ac dolor aliquam sodales.\r\n                                                                Phasellus sed mauris hendrerit, laoreet sem in, lobortis\r\n                                                                mauris hendrerit ante."}
                              </p>
                              {" "}
                            </div>
                            {" "}
                          </div>
                          {" "}
                          {" "}
                          {" "}
                          <div className="resume-single-list">
                            {" "}
                            <div className="inner">
                              {" "}
                              <div className="heading">
                                {" "}
                                <div className="title">
                                  {" "}
                                  <h4>
                                    {"Programming Course"}
                                  </h4>
                                  {" "}
                                  <span>
                                    {"University of Rajasthan (2015-2016)"}
                                  </span>
                                  {" "}
                                </div>
                                {" "}
                                {" "}
                              </div>
                              {" "}
                              <p className="description">
                                {" If you are going to use a passage.\r\n                                                                Ut tincidunt est ac dolor aliquam sodales.\r\n                                                                Phasellus sed mauris hendrerit, laoreet sem in, lobortis\r\n                                                                mauris hendrerit ante."}
                              </p>
                              {" "}
                            </div>
                            {" "}
                          </div>
                          {" "}
                          {" "}
                        </div>
                        {" "}
                      </div>
                      {" "}
                    </div>
                    {" "}
                    {" "}
                    {" "}
                    <div className="col-lg-6 col-md-12 col-12 mt_md--60 mt_sm--60">
                      {" "}
                      <div className="content">
                        {" "}
                        <div className="experience-list">
                          {" "}
                          {" "}
                          <div className="resume-single-list">
                            {" "}
                            <div className="inner">
                              {" "}
                              <div className="heading">
                                {" "}
                                <div className="title">
                                  {" "}
                                  <h4>
                                    {"Master In Computer Applications"}
                                  </h4>
                                  {" "}
                                  <span>
                                    {"Rajasthan Techniacal University (2012 - 2015)"}
                                  </span>
                                  {" "}
                                </div>
                                {" "}
                                {" "}
                              </div>
                              {" "}
                              <p className="description">
                                {"Contrary to popular belief. Ut\r\n                                                                tincidunt est ac dolor aliquam sodales.\r\n                                                                Phasellus sed mauris hendrerit, laoreet sem in, lobortis\r\n                                                                mauris hendrerit ante."}
                              </p>
                              {" "}
                            </div>
                            {" "}
                          </div>
                          {" "}
                          {" "}
                          {" "}
                          <div className="resume-single-list">
                            {" "}
                            <div className="inner">
                              {" "}
                              <div className="heading">
                                {" "}
                                <div className="title">
                                  {" "}
                                  <h4>
                                    {"Bachlor in Computer Applications"}
                                  </h4>
                                  {" "}
                                  <span>
                                    {"Rajasthan Techniacal University (2008-2011)"}
                                  </span>
                                  {" "}
                                </div>
                                {" "}
                                {" "}
                              </div>
                              {" "}
                              <p className="description">
                                {"Generate Lorem Ipsum which looks. Ut\r\n                                                                tincidunt est ac dolor aliquam sodales.\r\n                                                                Phasellus sed mauris hendrerit, laoreet sem in, lobortis\r\n                                                                mauris hendrerit ante."}
                              </p>
                              {" "}
                            </div>
                            {" "}
                          </div>
                          {" "}
                        </div>
                        {" "}
                      </div>
                      {" "}
                    </div>
                    {" "}
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              {" "}
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </div>
      {" "}
    </div>
  );
}
function TestimonialsSection() {
  return (
<div className="rn-testimonial-area rn-section-gap section-separator" id="testimonial">
      {" "}
      <div className="container">
        {" "}
        <div className="row">
          {" "}
          <div className="col-lg-12">
            {" "}
            <div className="section-title text-center">
              {" "}
              <span className="subtitle">
                {"Client testimonials"}
              </span>
              {" "}
              <h2 className="title">
                {"Good work. "}
                <br />
                {"Great partnerships."}
              </h2>
              {" "}
              <p className="testimonial-intro">
                {"A space for client stories, shared experiences and the details that make a difference."}
              </p>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
        <div className="row">
          {" "}
          <div className="col-lg-12">
            {" "}
            <div className="testimonial-carousel owl-carousel" id="google-reviews-list" aria-live="polite">
              {" "}
              {" "}
              <div className="testimonial mt--50">
                {" "}
                <div className="inner">
                  {" "}
                  <div className="card-info google-review-brand">
                    {" "}
                    <div className="card-thumbnail">
                      {" "}
                      <img src="assets/images/portfolio-01.jpg" alt="Website performance optimization project" />
                      {" "}
                    </div>
                    {" "}
                    <div className="card-content">
                      {" "}
                      <span className="google-badge">
                        {"G"}
                      </span>
                      {" "}
                      <span className="subtitle mt--10">
                        {"Google Business Profile"}
                      </span>
                      {" "}
                      <h3 className="title">
                        {"See what clients say"}
                      </h3>
                      {" "}
                      <span className="designation">
                        {"Real reviews • Verified on Google"}
                      </span>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <div className="card-description">
                    {" "}
                    <div className="review-heading">
                      {" "}
                      <div className="google-mark" aria-hidden="true">
                        {"G"}
                      </div>
                      {" "}
                      <div>
                        {" "}
                        <span className="review-kicker">
                          {"Reviews"}
                        </span>
                        {" "}
                        <h3 className="title">
                          {"Sharma House"}
                        </h3>
                        {" "}
                      </div>
                      {" "}
                    </div>
                    {" "}
                    <div className="title-area">
                      {" "}
                      <div className="title-info">
                        {" "}
                        <h3 className="title">
                          {"Your experience matters"}
                        </h3>
                        {" "}
                        <span className="date">
                          {"Read genuine feedback on Google"}
                        </span>
                        {" "}
                      </div>
                      {" "}
                      <span className="review-stars" aria-label="Google reviews">
                        <span>
                          {"★★★★★"}
                        </span>
                      </span>
                      {" "}
                    </div>
                    {" "}
                    <div className="seperator" />
                    {" "}
                    <p className="discription">
                      {"\r\n                                    Explore the latest customer feedback, service experience and public business\r\n                                    information directly on the Google Business Profile.\r\n                                "}
                    </p>
                    {" "}
                    <a className="google-review-button" href="https://www.google.com/maps/place/Sharma+House+Ganga+Sagar+Scheme/@26.9188671,75.6531865,13z/data=!4m10!1m2!2m1!1ssharma+house+ganga+sagar+scheme!3m6!1s0x396c4da605679271:0x3d5f81095ee51a04!8m2!3d26.9188671!4d75.7294042!15sCh9zaGFybWEgaG91c2UgZ2FuZ2Egc2FnYXIgc2NoZW1lWiEiH3NoYXJtYSBob3VzZSBnYW5nYSBzYWdhciBzY2hlbWWSAR1jb21wdXRlcl9zdXBwb3J0X2FuZF9zZXJ2aWNlc-ABAA!16s%2Fg%2F11fp42yrlb?entry=ttu&g_ep=EgoyMDI2MDkyMi4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer">
                      {"\r\n                                    View reviews on Google "}
                      <i className="feather-arrow-up-right" />
                      {" "}
                    </a>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              {" "}
              <div className="testimonial mt--50">
                {" "}
                <div className="inner">
                  {" "}
                  <div className="card-info google-review-brand">
                    {" "}
                    <div className="card-thumbnail">
                      {" "}
                      <img src="assets/images/portfolio-02.jpg" alt="Full stack web application project" />
                      {" "}
                    </div>
                    {" "}
                    <div className="card-content">
                      {" "}
                      <span className="google-badge">
                        {"G"}
                      </span>
                      {" "}
                      <span className="subtitle mt--10">
                        {"Public feedback"}
                      </span>
                      {" "}
                      <h3 className="title">
                        {"Trusted by clients"}
                      </h3>
                      {" "}
                      <span className="designation">
                        {"Open the listing to read reviews"}
                      </span>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <div className="card-description">
                    {" "}
                    <div className="review-heading">
                      {" "}
                      <div className="google-mark" aria-hidden="true">
                        {"G"}
                      </div>
                      {" "}
                      <div>
                        {" "}
                        <span className="review-kicker">
                          {"Google Business Profile"}
                        </span>
                        {" "}
                        <h3 className="title">
                          {"Sharma House Ganga Sagar Scheme"}
                        </h3>
                        {" "}
                      </div>
                      {" "}
                    </div>
                    {" "}
                    <div className="title-area">
                      {" "}
                      <div className="title-info">
                        {" "}
                        <h3 className="title">
                          {"Verified public profile"}
                        </h3>
                        {" "}
                        <span className="date">
                          {"Services • Location • Client feedback"}
                        </span>
                        {" "}
                      </div>
                      {" "}
                      <span className="review-stars" aria-label="Google reviews">
                        <span>
                          {"★★★★★"}
                        </span>
                      </span>
                      {" "}
                    </div>
                    {" "}
                    <div className="seperator" />
                    {" "}
                    <p className="discription">
                      {"\r\n                                    Visit the listing to see the latest reviews and learn more before starting\r\n                                    your next project.\r\n                                "}
                    </p>
                    {" "}
                    <a className="google-review-button" href="https://www.google.com/maps/search/?api=1&query=Sharma+House+Ganga+Sagar+Scheme" target="_blank" rel="noopener noreferrer">
                      {"\r\n                                    Open Google profile "}
                      <i className="feather-arrow-up-right" />
                      {" "}
                    </a>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </div>
      {" "}
    </div>
  );
}
function ContactSection() {
  return (
<div className="rn-contact-area rn-section-gap section-separator" id="contacts">
      {" "}
      <div className="container">
        {" "}
        <div className="row">
          {" "}
          <div className="col-lg-12">
            {" "}
            <div className="section-title text-center">
              {" "}
              <span className="subtitle">
                {"Contact"}
              </span>
              {" "}
              <h2 className="title">
                {"Let's build something great."}
              </h2>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
        <div className="row mt--50 mt_md--40 mt_sm--40 mt-contact-sm">
          {" "}
          <div className="col-lg-5">
            {" "}
            <div className="contact-about-area">
              {" "}
              <span className="contact-availability">
                <span aria-hidden="true" />
                {" Available for freelance projects"}
              </span>
              {" "}
              <h3 className="contact-intro-title">
                {"Your idea."}
                <br />
                {"Our next project."}
              </h3>
              {" "}
              <p className="contact-intro-copy">
                {"Need a website, an application or a better experience for your users? Tell me what you have in mind."}
              </p>
              {" "}
              <div className="contact-direct-links">
                {" "}
                <a href="mailto:ashishshrmaa@outlook.com">
                  <span className="contact-link-icon" aria-hidden="true">
                    {"@"}
                  </span>
                  <span>
                    <small>
                      {"Email me"}
                    </small>
                    <strong>
                      {"ashishshrmaa@outlook.com"}
                    </strong>
                  </span>
                  <span aria-hidden="true">
                    {"↗"}
                  </span>
                </a>
                {" "}
                <a href="https://wa.me/919928686337" target="_blank" rel="noopener noreferrer">
                  <span className="contact-link-icon" aria-hidden="true">
                    {"↗"}
                  </span>
                  <span>
                    <small>
                      {"Chat on WhatsApp"}
                    </small>
                    <strong>
                      {"+91 99286 86337"}
                    </strong>
                  </span>
                  <span aria-hidden="true">
                    {"↗"}
                  </span>
                </a>
                {" "}
              </div>
              {" "}
              <p className="contact-closing">
                {"Build thoughtfully. Keep it simple."}
              </p>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
          <div data-aos-delay="600" className="col-lg-7 contact-input">
            {" "}
            <div className="contact-form-wrapper">
              {" "}
              <div className="introduce">
                {" "}
                <div className="contact-form-heading">
                  {" "}
                  <span className="contact-form-kicker">
                    {"LET'S BUILD TOGETHER"}
                  </span>
                  {" "}
                  <h3>
                    {"Tell me about your project"}
                  </h3>
                  {" "}
                  <p>
                    {"Share a few details and I will get back to you."}
                  </p>
                  {" "}
                  <div className="contact-form-points">
                    {" "}
                    <span>
                      <i className="feather-check" />
                      {" Fast response"}
                    </span>
                    {" "}
                    <span>
                      <i className="feather-check" />
                      {" Clear estimates"}
                    </span>
                    {" "}
                    <span>
                      <i className="feather-check" />
                      {" Scalable solutions"}
                    </span>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
                <form className="rnt-contact-form row" id="contact-form" method="POST" action="">
                  {" "}
                  <div className="col-lg-6">
                    {" "}
                    <div className="form-group">
                      {" "}
                      <label htmlFor="contact-name">
                        {"Your Name"}
                      </label>
                      {" "}
                      <input className="form-control form-control-lg" name="contact-name" id="contact-name" type="text" autoComplete="name" placeholder="Your full name" required />
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <div className="col-lg-6">
                    {" "}
                    <div className="form-group">
                      {" "}
                      <label htmlFor="contact-phone">
                        {"Phone Number"}
                      </label>
                      {" "}
                      <input className="form-control" name="contact-phone" id="contact-phone" type="tel" autoComplete="tel" placeholder="Phone (optional)" />
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <div className="col-lg-12">
                    {" "}
                    <div className="form-group">
                      {" "}
                      <label htmlFor="contact-email">
                        {"Email"}
                      </label>
                      {" "}
                      <input className="form-control form-control-sm" id="contact-email" name="contact-email" type="email" autoComplete="email" placeholder="you@example.com" required />
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <div className="col-lg-12">
                    {" "}
                    <div className="form-group">
                      {" "}
                      <label htmlFor="subject">
                        {"Project type"}
                      </label>
                      {" "}
                      <input className="form-control form-control-sm" id="subject" name="subject" type="text" placeholder="Website, app or maintenance" />
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <div className="col-lg-12">
                    {" "}
                    <div className="form-group">
                      {" "}
                      <label htmlFor="contact-message">
                        {"Your Message"}
                      </label>
                      {" "}
                      <textarea name="contact-message" id="contact-message" cols="30" rows="3" placeholder="A little about your goals and timeline..." required />
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <div className="col-lg-12">
                    {" "}
                    <div className="form-group contact-captcha-group">
                      {" "}
                      <label htmlFor="contact-captcha">
                        {"Security check"}
                      </label>
                      {" "}
                      <div className="contact-captcha">
                        {" "}
                        <span className="captcha-question" id="captcha-question">
                          {"----"}
                        </span>
                        {" "}
                        <span className="captcha-equals">
                          {"="}
                        </span>
                        {" "}
                        <input className="form-control" id="contact-captcha" name="contact-captcha" type="text" inputMode="numeric" maxLength="4" placeholder="Enter answer" aria-label="Enter the captcha answer" required />
                        {" "}
                        <button type="button" className="captcha-refresh" id="captcha-refresh" aria-label="Generate a new math captcha">
                          {"↻"}
                        </button>
                        {" "}
                      </div>
                      {" "}
                      <small className="captcha-help" id="captcha-help">
                        {"Solve the math problem to send your message."}
                      </small>
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <div className="col-lg-12">
                    {" "}
                    <button name="submit" type="submit" id="submit" className="rn-btn">
                      {" "}
                      <span>
                        {"SEND MESSAGE"}
                      </span>
                      {" "}
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                      {" "}
                    </button>
                    {" "}
                  </div>
                  {" "}
                </form>
                {" "}
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </div>
      {" "}
    </div>
  );
}

function HomepageDecorations() {
  return (
    <>
<div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-hidden="true">
      {" "}
      <div className="modal-dialog modal-dialog-centered" role="document">
        {" "}
        <div className="modal-content">
          {" "}
          <div className="modal-header">
            {" "}
            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
              {" "}
              <span aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </span>
              {" "}
            </button>
            {" "}
          </div>
          {" "}
          <div className="modal-body">
            {" "}
            <div className="row align-items-center">
              {" "}
              <div className="col-lg-6">
                {" "}
                <div className="portfolio-popup-thumbnail">
                  {" "}
                  <div className="image">
                    {" "}
                    <img className="w-100" src="assets/images/portfolio-04.jpg" alt="slide" />
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </div>
              {" "}
              <div className="col-lg-6">
                {" "}
                <div className="text-content">
                  {" "}
                  <h3>
                    {" "}
                    <span>
                      {"Featured - Design"}
                    </span>
                    {" App Design Development.\r\n                                    "}
                  </h3>
                  {" "}
                  <p className="mb--30">
                    {"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate distinctio assumenda explicabo veniam temporibus eligendi."}
                  </p>
                  {" "}
                  <p>
                    {"Consectetur adipisicing elit. Cupiditate distinctio assumenda. dolorum alias suscipit rerum maiores aliquam earum odit, nihil culpa quas iusto hic minus!"}
                  </p>
                  {" "}
                  <div className="button-group mt--20">
                    {" "}
                    <a href="#" className="rn-btn thumbs-icon">
                      {" "}
                      <span>
                        {"LIKE THIS"}
                      </span>
                      {" "}
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-thumbs-up">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                      </svg>
                      {" "}
                    </a>
                    {" "}
                    <a href="#" className="rn-btn">
                      {" "}
                      <span>
                        {"VIEW PROJECT"}
                      </span>
                      {" "}
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-right">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                      {" "}
                    </a>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
                {" "}
              </div>
              {" "}
            </div>
            {" "}
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </div>
      {" "}
    </div>
<div className="modal fade" id="exampleModalCenters" tabIndex="-1" role="dialog" aria-hidden="true">
      {" "}
      <div className="modal-dialog modal-dialog-centered modal-news" role="document">
        {" "}
        <div className="modal-content">
          {" "}
          <div className="modal-header">
            {" "}
            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
              {" "}
              <span aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </span>
              {" "}
            </button>
            {" "}
          </div>
          {" "}
          {" "}
          <div className="modal-body">
            {" "}
            <img src="assets/images/blog-big-01.jpg" alt="news modal" className="img-fluid modal-feat-img" />
            {" "}
            <div className="news-details">
              {" "}
              <span className="date">
                {"2 May, 2021"}
              </span>
              {" "}
              <h2 className="title">
                {"Digital Marketo to Their New Office."}
              </h2>
              {" "}
              <p>
                {"Nobis eleifend option congue nihil imperdiet doming id quod mazim placerat\r\n                                facer\r\n                                possim assum.\r\n                                Typi non\r\n                                habent claritatem insitam; est usus legentis in iis qui facit eorum\r\n                                claritatem.\r\n                                Investigationes\r\n                                demonstraverunt\r\n                                lectores legere me lius quod ii legunt saepius. Claritas est etiam processus\r\n                                dynamicus, qui\r\n                                sequitur\r\n                                mutationem consuetudium lectorum."}
              </p>
              {" "}
              <h4>
                {"Nobis eleifend option conguenes."}
              </h4>
              {" "}
              <p>
                {"Mauris tempor, orci id pellentesque convallis, massa mi congue eros, sed\r\n                                posuere\r\n                                massa nunc quis\r\n                                dui.\r\n                                Integer ornare varius mi, in vehicula orci scelerisque sed. Fusce a massa\r\n                                nisi.\r\n                                Curabitur sit\r\n                                amet\r\n                                suscipit nisl. Sed eget nisl laoreet, suscipit enim nec, viverra eros. Nunc\r\n                                imperdiet risus\r\n                                leo,\r\n                                in rutrum erat dignissim id."}
              </p>
              {" "}
              <p>
                {"Ut rhoncus vestibulum facilisis. Duis et lorem vitae ligula cursus venenatis.\r\n                                Class aptent\r\n                                taciti sociosqu\r\n                                ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc vitae\r\n                                nisi\r\n                                tortor. Morbi\r\n                                leo\r\n                                nulla, posuere vel lectus a, egestas posuere lacus. Fusce eleifend hendrerit\r\n                                bibendum. Morbi\r\n                                nec\r\n                                efficitur ex."}
              </p>
              {" "}
              <h4>
                {"Mauris tempor, orci id pellentesque."}
              </h4>
              {" "}
              <p>
                {"Nulla non ligula vel nisi blandit egestas vel eget leo. Praesent fringilla\r\n                                dapibus dignissim.\r\n                                Pellentesque\r\n                                quis quam enim. Vestibulum ultrices, leo id suscipit efficitur, odio lorem\r\n                                rhoncus dolor, a\r\n                                facilisis\r\n                                neque mi ut ex. Quisque tempor urna a nisi pretium, a pretium massa\r\n                                tristique.\r\n                                Nullam in\r\n                                aliquam\r\n                                diam. Maecenas at nibh gravida, ornare eros non, commodo ligula. Sed\r\n                                efficitur\r\n                                sollicitudin\r\n                                auctor.\r\n                                Quisque nec imperdiet purus, in ornare odio. Quisque odio felis, vestibulum\r\n                                et."}
              </p>
              {" "}
            </div>
            {" "}
            {" "}
            <div className="comment-inner">
              {" "}
              <h3 className="title mb--40 mt--50">
                {"Leave a Reply"}
              </h3>
              {" "}
              <form action="#">
                {" "}
                <div className="row">
                  {" "}
                  <div className="col-lg-6 col-md-12 col-12">
                    {" "}
                    <div className="rnform-group">
                      <input type="text" placeholder="Name" />
                      {" "}
                    </div>
                    {" "}
                    <div className="rnform-group">
                      <input type="email" placeholder="Email" />
                      {" "}
                    </div>
                    {" "}
                    <div className="rnform-group">
                      <input type="text" placeholder="Website" />
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <div className="col-lg-6 col-md-12 col-12">
                    {" "}
                    <div className="rnform-group">
                      {" "}
                      <textarea placeholder="Comment" />
                      {" "}
                    </div>
                    {" "}
                  </div>
                  {" "}
                  <div className="col-lg-12">
                    {" "}
                    <a className="rn-btn" href="#">
                      <span>
                        {"SUBMIT NOW"}
                      </span>
                    </a>
                    {" "}
                  </div>
                  {" "}
                </div>
                {" "}
              </form>
              {" "}
            </div>
            {" "}
            {" "}
          </div>
          {" "}
          {" "}
        </div>
        {" "}
      </div>
      {" "}
    </div>
<div className="backto-top" style={{ "opacity": "0" }}>
      {" "}
      <div>
        {" "}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up">
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
        {" "}
      </div>
      {" "}
    </div>
<div className="side-contact-rail" aria-label="Connect with Ashish">
      {" "}
      <a className="side-contact-link whatsapp" href="https://wa.me/919928686337?text=Hi%20Ashish%2C%20I%20would%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        {" "}
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          {" "}
          <path d="M20.5 3.5A11.8 11.8 0 0 0 12.08 0C5.55 0 .24 5.3.24 11.83c0 2.08.54 4.1 1.57 5.88L.14 24l6.43-1.64a11.8 11.8 0 0 0 5.51 1.36h.01c6.53 0 11.84-5.31 11.84-11.84 0-3.16-1.23-6.13-3.43-8.38ZM12.09 21.7h-.01a9.83 9.83 0 0 1-5.01-1.37l-.36-.21-3.82.98 1.02-3.72-.23-.38a9.82 9.82 0 1 1 8.41 4.7Zm5.4-7.36c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.28-.47-2.43-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.21 5.08 4.5.71.31 1.27.49 1.7.63.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
          {" "}
        </svg>
        {" "}
        <span>
          {"WhatsApp"}
        </span>
        {" "}
      </a>
      {" "}
      <a className="side-contact-link" href="mailto:ashishsharmaaa@outlook.com?subject=Project%20Enquiry" aria-label="Email Ashish">
        {" "}
        <i className="feather-mail" />
        <span>
          {"Email"}
        </span>
        {" "}
      </a>
      {" "}
      <a className="side-contact-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Connect on Instagram">
        {" "}
        <i className="feather-instagram" />
        <span>
          {"Instagram"}
        </span>
        {" "}
      </a>
      {" "}
    </div>
    </>
  );
}

function QuoteModal() {
  return (
<div className="modal fade" id="quoteModal" tabIndex="-1" aria-labelledby="quote-title" aria-describedby="quote-description" aria-hidden="true">
      {" "}
      <div className="modal-dialog modal-dialog-centered">
        {" "}
        <div className="modal-content quote-modal">
          {" "}
          <button type="button" className="custom-close" data-bs-dismiss="modal" aria-label="Close quote request">
            <span aria-hidden="true">
              {"×"}
            </span>
          </button>
          {" "}
          <div className="modal-body p-0">
            {" "}
            <div className="quote-header">
              {" "}
              <span className="quote-kicker">
                {"LET'S BUILD TOGETHER"}
              </span>
              {" "}
              <h2 id="quote-title">
                {"Start with an idea."}
              </h2>
              {" "}
              <p id="quote-description">
                {"Tell me a little about your project to request a quote."}
              </p>
              {" "}
            </div>
            {" "}
            <form className="quote-form">
              {" "}
              <div className="form-group">
                {" "}
                <label htmlFor="quote-name">
                  {"Your name "}
                  <span>
                    {"*"}
                  </span>
                </label>
                {" "}
                <input id="quote-name" name="name" type="text" autoComplete="name" placeholder="Your full name" required />
                {" "}
              </div>
              {" "}
              <div className="form-group">
                {" "}
                <label htmlFor="quote-email">
                  {"Email address "}
                  <span>
                    {"*"}
                  </span>
                </label>
                {" "}
                <input id="quote-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
                {" "}
              </div>
              {" "}
              <div className="form-group">
                {" "}
                <label htmlFor="quote-phone">
                  {"Phone "}
                  <small>
                    {"(optional)"}
                  </small>
                </label>
                {" "}
                <input id="quote-phone" name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" />
                {" "}
              </div>
              {" "}
              <div className="form-group">
                {" "}
                <label htmlFor="quote-service">
                  {"Service "}
                  <span>
                    {"*"}
                  </span>
                </label>
                {" "}
                <select id="quote-service" name="service" defaultValue="" required>
                  {" "}
                  <option value="" disabled>
                    {"Choose a service"}
                  </option>
                  {" "}
                  <option>
                    {"Website Development"}
                  </option>
                  <option>
                    {"WordPress Development"}
                  </option>
                  <option>
                    {"React / Next.js"}
                  </option>
                  <option>
                    {"E-Commerce"}
                  </option>
                  <option>
                    {"SEO"}
                  </option>
                  {" "}
                </select>
                {" "}
              </div>
              {" "}
              <div className="form-group quote-full">
                {" "}
                <label htmlFor="quote-budget">
                  {"Estimated budget "}
                  <small>
                    {"(optional)"}
                  </small>
                </label>
                {" "}
                <select id="quote-budget" name="budget">
                  {" "}
                  <option value="">
                    {"Choose your budget range"}
                  </option>
                  {" "}
                  <option>
                    {"$500 - $1000"}
                  </option>
                  <option>
                    {"$1000 - $3000"}
                  </option>
                  <option>
                    {"$3000 - $5000"}
                  </option>
                  <option>
                    {"$5000+"}
                  </option>
                  <option>
                    {"Let's discuss"}
                  </option>
                  {" "}
                </select>
                {" "}
              </div>
              {" "}
              <div className="form-group quote-full">
                {" "}
                <label htmlFor="quote-details">
                  {"Project details "}
                  <span>
                    {"*"}
                  </span>
                </label>
                {" "}
                <textarea id="quote-details" name="details" rows="3" placeholder="What would you like to build? Include any goals or timelines." required />
                {" "}
              </div>
              {" "}
              <div className="form-group quote-full">
                {" "}
                <label htmlFor="quote-captcha">
                  {"Security check "}
                  <span>
                    {"*"}
                  </span>
                </label>
                {" "}
                <div className="quote-captcha-row">
                  {" "}
                  <span id="quote-captcha-question" aria-live="polite">
                    {"..."}
                  </span>
                  {" "}
                  <span aria-hidden="true">
                    {"="}
                  </span>
                  {" "}
                  <input id="quote-captcha" name="quote-captcha" type="text" inputMode="numeric" pattern="[0-9]{1,2}" maxLength="2" placeholder="Answer" autoComplete="off" aria-describedby="quote-captcha-question quote-captcha-help" required />
                  {" "}
                  <button id="quote-captcha-refresh" type="button" aria-label="Generate a new math question">
                    {"↻"}
                  </button>
                  {" "}
                </div>
                {" "}
                <small id="quote-captcha-help" role="status">
                  {"Solve this simple sum to continue."}
                </small>
                {" "}
              </div>
              {" "}
              <button type="submit" className="quote-submit quote-full">
                {"Send quote request "}
                <span aria-hidden="true">
                  {"→"}
                </span>
              </button>
              {" "}
              <p className="privacy-note quote-full">
                {"Share only the details needed to discuss your project."}
              </p>
              {" "}
            </form>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </div>
      {" "}
    </div>
  );
}
