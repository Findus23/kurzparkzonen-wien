// import "leaflet-control-geocoder/dist/Control.Geocoder.js";
// import "leaflet-control-geocoder/dist/Control.Geocoder.css";
//@ts-ignore
import {GeocodingResult, NominatimResult} from "leaflet-control-geocoder/dist/geocoders";
// @ts-ignore
import searchPopupTemplate from "./searchPopup.ejs";
// @ts-ignore
import searchDisplayTemplate from "./searchDisplay.ejs";


export function searchPopupHtml(properties: NominatimResult, template_type: string, icon: string | undefined) {
    const address = properties.address;
    let bezirk;
    if (address.postcode) {
        bezirk = (parseInt(address.postcode) - 1000) / 10
    }
    let display_name = "";
    const nameParts = properties.display_name.split(",");
    for (let i = 0; i < nameParts.length; ++i) {
        let namePart = nameParts[i].trim();
        if (
            namePart == address.house_number ||
            namePart == address.road ||
            namePart == address.neighbourhood
        ) {
            break
        }
        display_name += namePart + " ";

    }
    display_name = display_name.trim()
    const html = searchDisplayTemplate({
        icon: icon,
        address: properties.address,
        display_name: display_name,
        bezirk: bezirk
    });
    if (template_type == "searchDisplayTemplate") {
        return html
    }
    return searchPopupTemplate({rawHTML: html});
}
