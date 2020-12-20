/**
 * A typescript port of https://github.com/jczaplew/geojson-precision/blob/master/index.js
 * by John J Czaplewski (@jczaplew)
 */
import {Feature, FeatureCollection, GeoJSON, Geometry, GeometryCollection, Position} from "geojson";


export function reduce_precision(t: GeoJSON, precision: number) {
    function point(p: Position): Position {
        return p.map(function (e, index) {
            const exp = Math.pow(10, precision)
            return Math.round((e + Number.EPSILON) * exp) / exp
        });
    }

    function multi(l: Position[]): Position[] {
        return l.map(point);
    }

    function poly(p: Position[][]): Position[][] {
        return p.map(multi);
    }

    function multiPoly(m: Position[][][]): Position[][][] {
        return m.map(poly);
    }

    function geometry(obj: Geometry): Geometry {
        switch (obj.type) {
            case "Point":
                obj.coordinates = point(obj.coordinates);
                return obj;
            case "LineString":
            case "MultiPoint":
                obj.coordinates = multi(obj.coordinates);
                return obj;
            case "Polygon":
            case "MultiLineString":
                obj.coordinates = poly(obj.coordinates);
                return obj;
            case "MultiPolygon":
                obj.coordinates = multiPoly(obj.coordinates);
                return obj;
            case "GeometryCollection":
                obj.geometries = obj.geometries.map(geometry);
                return obj;
        }
    }

    function feature(obj: Feature): Feature {
        obj.geometry = geometry(obj.geometry);
        return obj
    }

    function featureCollection(f: FeatureCollection): FeatureCollection {
        f.features = f.features.map(feature);
        return f;
    }

    function geometryCollection(g: GeometryCollection): GeometryCollection {
        g.geometries = g.geometries.map(geometry);
        return g;
    }

    switch (t.type) {
        case "Feature":
            return feature(t);
        case "GeometryCollection" :
            return geometryCollection(t);
        case "FeatureCollection" :
            return featureCollection(t);
        case "Point":
        case "LineString":
        case "Polygon":
        case "MultiPoint":
        case "MultiPolygon":
        case "MultiLineString":
            return geometry(t);
        default :
            return t;
    }
}

