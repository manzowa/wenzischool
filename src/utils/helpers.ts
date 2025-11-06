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
    let voie: string = capitalize(data?.voie);
    let quartier: string = isEmpty(data?.quartier) ? "?" : capitalize(data.quartier?.toString());
    let commune: string = capitalize(data?.commune);
    let district: string = capitalize(data?.district);
    let ville: string = capitalize(data?.ville);
    let reference: string = data?.reference != null ? capitalize(data?.reference) : "";

    return `${voie}, Q/${quartier}, \nC/${commune}, ${district}, ${ville}, \n${reference}`;
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
  return bool === true ? ("Logo") : ("Ionicons");
};

/**
 * @function formatDate
 * @author Christian Shungu <christianshungu@google.com>
 * @param {string} valDate
 * @description  return Logo  or Ionicons
 * 
 * @returns {string}
 */
export function formatDate(valDate: any, withTime: boolean = false) {
  let oDate = new Date(valDate);

  // Récupérer les composants de la date
  const dayOfWeek = oDate.toLocaleString('fr-FR', { weekday: 'long' });
  const day = oDate.toLocaleString('fr-FR', { day: 'numeric' });
  const month = oDate.toLocaleString('fr-FR', { month: 'long' });
  const year = oDate.toLocaleString('fr-FR', { year: 'numeric' });

  // Créer la chaîne de base (sans l'heure)
  let formattedDate = `${ucfirst(dayOfWeek)} ${day} ${month} ${year}`;

  // Si on veut ajouter l'heure, on le fait ici
  if (withTime) {
    const hour = oDate.getHours();
    const minute = oDate.getMinutes();

    // Ajouter l'heure et la minute dans le format "à 10H05"
    const formattedTime = ` à ${hour}H${minute < 10 ? '0' + minute : minute}`;
    formattedDate += formattedTime;
  }

  return formattedDate;
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
  if (typeof str !== "string" || !str) {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export async function isLinkActive(url: string) {
  try {
    const response = await fetch(url, { method: "HEAD", mode: "no-cors" });
    if (!response.ok) {
      return false;
    }
    return true;
  } catch (_) {
    return false;
  }
};

export function formaTimer(time: string, withSeconds: boolean = false) {
  if (time.length === 5) {
    time += ":00"; 
  }
  const [hour, minute, second] = time.split(':').map(num => parseInt(num, 10));

  let formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

  if (withSeconds) {
    formattedTime += `:${second.toString().padStart(2, '0')}`;
  }

  return formattedTime;
};

export function isDatePassedOrValid(param: Date | string): boolean | string {
  // Fonction pour vérifier si la date est valide
  function isValidDate(date: Date | string): boolean {
    let parsedDate: Date;

    if (date instanceof Date) {
      parsedDate = date;
    } else if (typeof date === 'string') {
      // Manually split the date and time to handle the custom format
      const [datePart, timePart] = date.split(' ');
      const formattedDate = `${datePart}T${timePart}`;
      parsedDate = new Date(formattedDate);
    } else {
      return false;
    }

    return !isNaN(parsedDate.getTime());
  }

  // Si le paramètre n'est pas valide, retourne un message d'erreur
  if (!isValidDate(param)) {
    return 'Date invalide';
  }

  const dateToCheck = new Date(param);
  const now = new Date();

  return dateToCheck < now;
}