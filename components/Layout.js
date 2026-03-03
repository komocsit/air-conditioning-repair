import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();

  // Intercept anchor tags to use client-side routing to prevent white flashes
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const a = e.target.closest("a");
      if (!a || !a.href) return;

      const url = new URL(a.href);
      if (url.origin === window.location.origin) {
        if (a.getAttribute("target") === "_blank") return;
        if (url.pathname.includes(".pdf")) return;
        if (a.getAttribute("href").startsWith("#")) return; // Ignore internal hash links

        e.preventDefault();
        router.push(url.pathname + url.search + url.hash);
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, [router]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta charSet="utf-8" />
        <title>CoolBreeze AC Repair</title>
      </Head>

      <div
        suppressHydrationWarning={true}
        dangerouslySetInnerHTML={{
          __html: `<aside class="side-widget">
<div class="inner">
<!-- Logo Menu Mobile -->
    <div class="logo"> <a href="/"><img src="/logo-ac-repair.svg" alt="AC Repair Logo" style="height:52px;width:auto;"></a> </div>
    <div class="hide-mobile">
    <div class="or">
        <h2 class="h2-baslik-hizmetler-2"> Contact Information </h2>
    </div>
    <div class="bosluksv"></div>
    <div class="iconsv"><i class="flaticon-call"></i></div>
    <address class="address">

        
        +1 (234) 567 89 10
        
        <div class="bosluksv"></div>


        <div class="iconsv"><i class="flaticon-email"></i></div>

        
        example@example.com
        
        <div class="bosluksv"></div>
        <div class="iconsv"><i class="flaticon-location"></i></div>

        
        New Jersey, USA
        
        <div class="bosluksv"></div>
        <div class="or">

                    <a href="#"><i class="icon-social-facebook iconsocia"></i></a>
         

                    <a href="#"><i class="icon-social-instagram iconsociai"></i></a>
         

                    <a href="#"><i class="icon-social-twitter iconsocia"></i></a>
          

        </div>
    </address>
    </div>
    <div class="show-mobile">
    <div class="site-menu">
        <div class="menu">

        <div id="bs-example-navbar-collapse-1" class="collapse navbar-collapse"><ul id="menu-mobile-menu" class="nav navbar-nav" itemscope="" itemtype="http://www.schema.org/SiteNavigationElement"><li id="menu-item-1240" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-5 current_page_item active menu-item-1240 nav-item"><a itemprop="url" href="/" class="nav-link" aria-current="page"><span itemprop="name">Home</span></a></li>
<li id="menu-item-1241" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1241 nav-item"><a itemprop="url" href="/about-us" class="nav-link"><span itemprop="name">About Us</span></a></li>
<li id="menu-item-1242" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children dropdown menu-item-1242 nav-item"><a href="#" data-toggle="dropdown" aria-expanded="false" class="dropdown-toggle nav-link" id="menu-item-dropdown-1242"><span itemprop="name">Services</span></a>
<ul class="dropdown-menu" aria-labelledby="menu-item-dropdown-1242">
        <li class="menu-item menu-item-type-post_type nav-item"><a itemprop="url" href="/air-conditioning-repair" class="dropdown-item"><span itemprop="name">AC Repair &amp; Diagnostics</span></a></li>
        <li class="menu-item menu-item-type-post_type nav-item"><a itemprop="url" href="/ac-installation" class="dropdown-item"><span itemprop="name">AC Installation</span></a></li>
        <li class="menu-item menu-item-type-post_type nav-item"><a itemprop="url" href="/ac-maintenance" class="dropdown-item"><span itemprop="name">AC Maintenance</span></a></li>
        <li class="menu-item menu-item-type-post_type nav-item"><a itemprop="url" href="/duct-cleaning" class="dropdown-item"><span itemprop="name">Duct Cleaning</span></a></li>
        <li class="menu-item menu-item-type-post_type nav-item"><a itemprop="url" href="/emergency-ac-service" class="dropdown-item"><span itemprop="name">Emergency AC Service</span></a></li>
        <li class="menu-item menu-item-type-post_type nav-item"><a itemprop="url" href="/all-services" class="dropdown-item"><span itemprop="name">All Services</span></a></li>
</ul>
</li>
<li id="menu-item-1260" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1260 nav-item"><a itemprop="url" href="/contact" class="nav-link"><span itemprop="name">Contact</span></a></li>
</ul></div>        </div>
        </div>
    </div>
    <small>
            © 2026 CoolBreeze AC Repair        
    </small> </div>
</aside>`,
        }}
      />
      <div
        suppressHydrationWarning={true}
        dangerouslySetInnerHTML={{
          __html: `<nav class="navbar navbar-expand-md navbar-light bg-light" style="background: linear-gradient(to bottom, #ffffff 0%, #f4f4f4 80%, #e0e0e0 100%) !important; border-radius: 12px 12px 25px 25px; box-shadow: 0 15px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1), inset 0 -4px 0 0 #d0d0d0; border: 1px solid #eaeaea; margin-top: 15px; max-width: 1200px; margin-left: auto; margin-right: auto; position: relative;">
<div style="position: absolute; bottom: 12px; left: 6%; right: 6%; height: 6px; background: #222; border-radius: 10px; opacity: 0.85; box-shadow: inset 0 3px 5px rgba(0,0,0,0.8);"></div>
<div style="position: absolute; right: 40px; top: 25px; width: 40px; height: 20px; background: #000; border-radius: 4px; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 0 8px rgba(0,0,0,0.9); z-index: 10;">
  <span style="color: #00ffcc; font-family: 'Courier New', Courier, monospace; font-size: 12px; font-weight: bold; letter-spacing: 1px;">72&deg;</span>
</div>
<div class="container" style="position: relative; z-index: 20; padding-bottom: 15px;">
<!-- Logo Menu Desktop -->
    <div class="logo"> <a href="/">
                 <img src="/logo-ac-repair.svg" alt="AC Repair Logo" style="height:52px;width:auto;">
        
    </a> 
    </div>
        <div class="site-menu">
        <div class="menueffect">
        <div id="bs-example-navbar-collapse-2" class="collapse navbar-collapse"><ul id="menu-main-menu" class="nav navbar-nav" itemscope="" itemtype="http://www.schema.org/SiteNavigationElement"><li id="menu-item-322" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-5 current_page_item active menu-item-322 nav-item"><a itemprop="url" href="/" class="nav-link" aria-current="page"><span itemprop="name">Home</span></a></li>
<li id="menu-item-329" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-329 nav-item"><a itemprop="url" href="/about-us" class="nav-link"><span itemprop="name">About Us</span></a></li>
<li id="menu-item-980" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children dropdown menu-item-980 nav-item"><a href="/air-conditioning-repair" data-toggle="dropdown" aria-expanded="false" class="dropdown-toggle nav-link" id="menu-item-dropdown-980"><span itemprop="name">Services</span></a>
<ul class="dropdown-menu" aria-labelledby="menu-item-dropdown-980">
        <li class="menu-item menu-item-type-post_type nav-item"><a itemprop="url" href="/air-conditioning-repair" class="dropdown-item"><span itemprop="name">AC Repair &amp; Diagnostics</span></a></li>
        <li class="menu-item menu-item-type-post_type nav-item"><a itemprop="url" href="/ac-installation" class="dropdown-item"><span itemprop="name">AC Installation</span></a></li>
        <li class="menu-item menu-item-type-post_type nav-item"><a itemprop="url" href="/ac-maintenance" class="dropdown-item"><span itemprop="name">AC Maintenance</span></a></li>
        <li class="menu-item menu-item-type-post_type nav-item"><a itemprop="url" href="/duct-cleaning" class="dropdown-item"><span itemprop="name">Duct Cleaning</span></a></li>
        <li class="menu-item menu-item-type-post_type nav-item"><a itemprop="url" href="/emergency-ac-service" class="dropdown-item"><span itemprop="name">Emergency AC Service</span></a></li>
        <li class="menu-item menu-item-type-post_type nav-item"><a itemprop="url" href="/all-services" class="dropdown-item"><span itemprop="name">All Services</span></a></li>
</ul>
</li>
<li id="menu-item-353" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-353 nav-item"><a itemprop="url" href="/contact" class="nav-link"><span itemprop="name">Contact</span></a></li>
</ul></div>        </div>
        </div>
        <div class="hamburger-menu"> <span></span> <span></span> <span></span> </div>

                <div class="navbar-button"> <div class="telh"><i class="flaticon-headphones iconp"></i>&nbsp;&nbsp;&nbsp;+1 (234) 567 89 10</div> </div>
            </div>
</nav>`,
        }}
      />

      {/* Main Page Content injected here */}
      {children}

      <div
        suppressHydrationWarning={true}
        dangerouslySetInnerHTML={{
          __html: `<footer class="footer">
    <div class="container">
        <div class="row">
            <div class="col-xl-3 col-lg-4 cce">
            <div class="logo wow animated fadeInUp animated" data-wow-delay="0s" style="visibility: hidden; animation-delay: 0s; animation-name: none;"> <img src="/logo-ac-repair-footer.svg" alt="AC Repair Logo" style="height:52px;width:auto;"> </div>
            <!-- end logo -->
            <div class="footer-info cce wow animated fadeInUp animated" data-wow-delay="0.5s" style="visibility: hidden; animation-delay: 0.5s; animation-name: none;">
                <p><i class="flaticon-pin iconpfooter1 "></i>New Jersey, USA</p>
                <p class="fic"><i class="flaticon-call iconpfooter2 "></i>&nbsp;&nbsp;&nbsp;+1 (234) 567 89 10</p><br>
                <p><i class="flaticon-email iconpfooter3 "></i>&nbsp;&nbsp;&nbsp;example@example.com</p><br>
            </div>
            <!-- end footer-info -->
            <ul class="footer-social cce wow animated fadeInUp animated" data-wow-delay="0.5s" style="visibility: hidden; animation-delay: 0.5s; animation-name: none;">
                            <li><a href="#"><i class="icon-social-facebook iconsociaf"></i></a></li>
             
                        <li><a href="#"><i class="icon-social-instagram iconsociaf"></i></a></li>
             
                            <li><a href="#"><i class="icon-social-twitter iconsociaf"></i></a></li>
             
            </ul>
            </div>
            <!-- end col-3 -->
            <div class="col-lg-4 cce wow fadeInUp" data-wow-delay="0.6s" style="visibility: hidden; animation-delay: 0.6s; animation-name: none;">
            <h6 class="widget-title">Join Our Newsletter</h6>
            <p class="footerp">
            Subscribe to be informed about our services and products.            </p>
            <div class="bosluk333"></div>
            <div role="form" class="wpcf7" id="wpcf7-f766-o2" lang="en-US" dir="ltr">
<div class="screen-reader-response"><p role="status" aria-live="polite" aria-atomic="true"></p> <ul></ul></div>
<form action="/wordpress/handymane/#wpcf7-f766-o2" method="post" class="wpcf7-form init" novalidate="novalidate" data-status="init">
<div style="display: none;">
<input type="hidden" name="_wpcf7" value="766">
<input type="hidden" name="_wpcf7_version" value="5.6">
<input type="hidden" name="_wpcf7_locale" value="en_US">
<input type="hidden" name="_wpcf7_unit_tag" value="wpcf7-f766-o2">
<input type="hidden" name="_wpcf7_container_post" value="0">
<input type="hidden" name="_wpcf7_posted_data_hash" value="">
</div>
<p><br></p>
<div class="form__grup wow fadeInLeft" data-wow-delay="0.7s" style="visibility: hidden; animation-delay: 0.7s; animation-name: none;">
        <span class="wpcf7-form-control-wrap" data-name="email-217"><input type="email" name="email-217" value="" size="40" class="wpcf7-form-control wpcf7-text wpcf7-email wpcf7-validates-as-required wpcf7-validates-as-email form-popup__input" aria-required="true" aria-invalid="false" placeholder="Your Email Address"></span>
    </div>
<div class="form__grup wow fadeInUp" data-wow-delay="0.9s" style="visibility: hidden; animation-delay: 0.9s; animation-name: none;">
        <input type="submit" value="Subscribe →" class="wpcf7-form-control has-spinner wpcf7-submit custom-button-form"><span class="wpcf7-spinner"></span>
    </div>
<div class="wpcf7-response-output" aria-hidden="true"></div></form></div>
                </div>
            <!-- end col-4 -->
            <div class="col-lg-2 offset-xl-1 col-sm-6 cce wow animated fadeInUp animated" data-wow-delay="0.5s" style="visibility: hidden; animation-delay: 0.5s; animation-name: none;">
            <h6 class="widget-title">Services</h6>

            <div class="footer-menu cce">
            <div class="menu-services-container"><ul id="menu-services" class="menu" itemscope="" itemtype="http://www.schema.org/SiteNavigationElement"><li id="menu-item-2082" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2082"><a href="/air-conditioning-repair">AC Repair &amp; Diagnostics</a></li>
<li id="menu-item-2081" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2081"><a href="/ac-installation">AC Installation</a></li>
<li id="menu-item-2080" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2080"><a href="/ac-maintenance">AC Maintenance</a></li>
<li id="menu-item-2079" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2079"><a href="/duct-cleaning">Duct Cleaning</a></li>
<li id="menu-item-2078" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2078"><a href="/emergency-ac-service">Emergency AC Service</a></li>
</ul></div>            </div>
            </div>
            <!-- end col-2 -->
            <div class="col-lg-2 col-sm-6 cce wow animated fadeInUp animated" data-wow-delay="0.5s" style="visibility: hidden; animation-delay: 0.5s; animation-name: none;">
            <h6 class="widget-title">Quick Links</h6>
            <div class="footer-menu">
            <div class="menu-quick-links-container"><ul id="menu-quick-links" class="menu" itemscope="" itemtype="http://www.schema.org/SiteNavigationElement"><li id="menu-item-2242" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-5 current_page_item menu-item-2242"><a href="/" aria-current="page">Home</a></li>
<li id="menu-item-1737" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1737"><a href="/about-us">About Us</a></li>
<li id="menu-item-2083" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-2083"><a href="/all-services">All Services</a></li>
<li id="menu-item-1734" class="menu-item menu-item-type-post_type menu-item-object-page menu-item-1734"><a href="/contact">Contact</a></li>
</ul></div>            </div>
            </div>
        </div>
        <!-- end row --> 
        </div>
    <!-- Copyright -->
    <div class="container">
        <div class="row">
            <div class="col-12">
                <p class="copyright">© 2026 CoolBreeze AC Repair - All Rights Reserved.</p>
            </div>
        </div>
    </div>
    <div id="top" style="cursor: pointer;">
        <i class="flaticon-chevron icontops"></i>
        <div class="bosluk3"></div>
    </div>
</footer>`,
        }}
      />
    </>
  );
}
