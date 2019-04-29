import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map'
import TileLayer from "ol/layer/Tile.js";
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import { fromLonLat } from "ol/proj.js";
import Geolocation from "ol/Geolocation"
import {ScaleLine, defaults as defaultControls, ZoomSlider} from "ol/control.js";
import { viewAttached } from '@angular/core/src/render3/instructions';
import Vector from "ol/layer/Vector";
import * as source from 'ol/source';
import Feature from 'ol/Feature';
import * as geom from 'ol/geom';




@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map:Map;
  geolocalizacion:Geolocation;
  constructor() { }

  ngOnInit() {
    this.initializeMap()
  }

  initializeMap(){
    this.map=new Map({
      target: 'map',
      controls: defaultControls().extend([
        new ScaleLine(),
        new ZoomSlider()
      ]),
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
       // projection: 'EPSG:4326',
        center: fromLonLat([-56.158966,-34.884448]),
        zoom: 16
      })
    });
  }
  localizar(){
    console.log("Buscado Localizacion");
    /*let geoloc = new Geolocation({
      projection: this.map.getView().getProjection(),
      tracking: true
    })

    var posicion = geoloc.getPosition();
    console.log("pos "+geoloc.getPosition());*/
    var point = new Vector({
      source : new source.Vector({
        features: [
          new Feature({
            geometry: new geom.Point(fromLonLat([-56.176456,-34.905389]))
          })
        ]
      })
    });
    this.map.addLayer(point);
    this.map.getView().setCenter(fromLonLat([-56.176456,-34.905389]));
    this.map.getView().setResolution(2.388657133911758);
  }
}


 