{{--
  Template Name: Contact
--}}

@extends('layouts.app')

@section('content')
  @while(have_posts()) @php the_post() @endphp
    @include('partials.page-header')
    <div class="row justify-content-center">
      <div class="col-sm-6">
        <div id="map"></div>
        <script>
          mapboxgl.accessToken = 'pk.eyJ1IjoicGF0cmlja2tlcmJ5IiwiYSI6ImpxWDBaVFkifQ.t3gbX7-Sfy3Z9Nh14aLFow';
          var map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/light-v10',
          center: [-113.5785801, 53.5203277],
          zoom: 13
          });
          
          var marker = new mapboxgl.Marker()
          .setLngLat([-113.5785801, 53.5203277])
          .addTo(map);

          // Add zoom and rotation controls to the map.
          map.addControl(new mapboxgl.NavigationControl());

          // disable map zoom when using scroll
          map.scrollZoom.disable();
        </script>
      </div>
      <div class="col-sm-5 contact-content">
        @include('partials.content-page')
      </div>
    </div>

  @endwhile
 
  @endsection