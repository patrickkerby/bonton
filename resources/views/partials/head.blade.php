<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1.0, user-scalable=no">
  
  {{-- <meta http-equiv="Content-Security-Policy" content="default-src https: 'unsafe-inline' 'unsafe-eval'; worker-src blob: ; child-src blob: ; img-src data: blob: ;"> --}}

  @if ( is_page('contact') )
    <script src='https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.js'></script>
    <link href='https://api.mapbox.com/mapbox-gl-js/v1.10.1/mapbox-gl.css' rel='stylesheet' />
  @endif
  @if ( is_cart() )
    @php acf_form_head() @endphp
  @endif
  
  {{-- GA4: gtag.js for custom events only (product_quick_view, filter_category, cart_date_conflict).
       Standard ecommerce + page_view handled by GTM via gtm4wp plugin. --}}
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-HTCXG3J87J"></script>
  <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-HTCXG3J87J',{send_page_view:false});</script>

  @php wp_head() @endphp
  <link rel="stylesheet" rel="preload" href="https://use.typekit.net/wvm4dbv.css" crossorigin>

</head>
