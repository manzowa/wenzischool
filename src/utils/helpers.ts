import { SchoolType } from "./types";
// import * as CryptoJS from 'crypto-js';
/**
 * @function capitalize
 * @author Christian Shungu <christianshungu@google.com>
 * @param {string} strValue 
 * @description capitalize first letter
 * 
 * @return {string}
 */
export function capitalize(strValue: string) {
    return String(strValue).charAt(0).toUpperCase() + String(strValue).slice(1);
};
/**
 * @function isEmpty
 * @author Christian Shungu <christianshungu@google.com>
 * @param {string} strValue 
 * @description capitalize first letter
 * 
 * @returns {boolean}
 */
export function isEmpty(strValue: string) {
    let o = new String(strValue);
    let res: boolean = o?.toString() === "null" || o.toString() === "" ? true : false;
    return res;
};
/**
 * @function formatAdresse
 * @author Christian Shungu <christianshungu@google.com>
 * @param {SchoolType["adresses"]} data 
 * @description format address school information
 * 
 * @returns {string}
 */
export function formatAdresse(data?: SchoolType["adresses"]) {
    if (data !== null && data?.voie) {
        let voie:string = capitalize(data?.voie);
        let quartier:string = isEmpty(data?.quartier)? "?" : capitalize(data.quartier?.toString());
        let commune:string = capitalize(data?.commune);
        let district:string = capitalize(data?.district);
        let ville:string = capitalize(data?.ville);
        let reference:string =data?.reference != null? capitalize(data?.reference): "";

        return `${voie}, Q/${quartier}, C/${commune}, ${district}, ${ville}, ${reference}`;
    }
    return "Aucune adresse disponible";
};
/**
 * @function iconSchool
 * @author Christian Shungu <christianshungu@google.com>
 * @param {boolean} bool
 * @description  return Logo  or Ionicons
 * 
 * @returns {string}
 */
export function iconSchool(bool: boolean) {
    return bool === true ? ("Logo"): ("Ionicons");
};

/**
 * @function formatDate
 * @author Christian Shungu <christianshungu@google.com>
 * @param {string} valDate
 * @description  return Logo  or Ionicons
 * 
 * @returns {string}
 */
export function formatDate(valDate: any) {
    let oDate = new Date(valDate);
    return oDate.toLocaleDateString();
};

/**
 * @function getArrayLogo
 * @author Christian Shungu <christianshungu@google.com>
 * @param {Array} data
 * @description  return Logo  or Ionicons
 * 
 * @returns {Array}
 */
export function getArrayLogo(data: any[]) {
    if (data && data.length > 0) {
        return data.filter((d: any) => d.filename.includes('logo'));
    }
    return [];
}

export function ucfirst(str: string) {
  if (!str) return str; // handle empty strings
  return str.charAt(0).toUpperCase() + str.slice(1);
}