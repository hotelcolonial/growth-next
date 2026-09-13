// Destinos de los iconos de redes del header y del footer.
// Unico sitio donde hay que tocar las URLs.

/**
 * WhatsApp. Formato internacional, solo digitos: 55 + DDD + numero.
 * Ej.: para (45) 99999-9999 en Brasil -> 'https://wa.me/5545999999999'
 *
 * OJO: el 0800 819 1993 NO sirve aqui. wa.me solo acepta moviles con DDD;
 * un 0800 es fijo gratuito y no tiene cuenta de WhatsApp asociada.
 *
 * Mientras esto quede vacio, el icono se muestra con su aspecto de marca pero
 * como placeholder no interactivo, para no publicar un enlace roto.
 */
export const WHATSAPP_URL = 'https://wa.me/5508008191993';

/**
 * Instagram. La cuenta aun no existe; en cuanto exista, poner aqui la URL
 * (ej. 'https://instagram.com/growthhotelsolutions') y el icono pasa solo de
 * placeholder a enlace real.
 */
export const INSTAGRAM_URL = '';
