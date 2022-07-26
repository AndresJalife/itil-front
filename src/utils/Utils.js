import resolveConfig from 'tailwindcss/resolveConfig';

export const tailwindConfig = () => {
  // Tailwind config
  return resolveConfig('./src/css/tailwind.config.js')
}

export const hexToRGB = (h) => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

export const formatValue = (value) => Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumSignificantDigits: 3,
  notation: 'compact',
}).format(value);


export const userIDToName = (id) => {
  console.log(id)
  let name =  {
    'auth0|629e61b46f7f59006922f069':'admin@itil.com',
    'auth0|629e61d64925f70068971b41':'soporte@itil.com',
    'auth0|62a357a84b6448c8e4f8684c':'normal@itil.com',
    null: "-"
  }[id]

  return (name == undefined ? "Usuario desconocido" : name)
}

export const  permisosByUserID = (id) => {
  let permisos =  { 
    'auth0|629e61b46f7f59006922f069':{ // admin
      "configuracion":{"crear": true, "borrar": true, "ver": true },
      "incidentes": {"crear": true, "borrar": true, "ver": true },
      "problemas": {"crear": true, "borrar": true, "ver": true },
      "cambios": {"crear": true, "borrar": true, "ver": true },
      "errores": {"crear": true, "borrar": true, "ver": true },
      "tomaroresolver": true
    },
    'auth0|629e61d64925f70068971b41':{// soporte
      "configuracion":{"crear": true, "borrar": false, "ver": true },
      "incidentes": {"crear": true, "borrar": false, "ver": true },
      "problemas": {"crear": true, "borrar": true, "ver": true },
      "cambios": {"crear": true, "borrar": false, "ver": true },
      "errores": {"crear": true, "borrar": true, "ver": true },
      "tomaroresolver": true
    },
    'auth0|62a357a84b6448c8e4f8684c':{//normal
      "configuracion":{"crear": false, "borrar": false, "ver": true },
      "incidentes": {"crear": true, "borrar": false, "ver": true },
      "problemas": {"crear": false, "borrar": false, "ver": false },
      "cambios": {"crear": false, "borrar": false, "ver": false },
      "errores": {"crear": false, "borrar": false, "ver": false },
      "tomaroresolver": false
    }
  }[id]

  return permisos
  //return (name == undefined ? "Usuario desconocido" : name)

}

export const simplifyDate = (date) => {
  if (date) {
    return date.substring(5, 22)  
  }
  return date
}

export const getOnlyDate = (date) => {
  if (date) {
    return date.substring(0, 16)  
  }
  return date
}


export const customFilter = ({ fieldName, filter, onChange , items}) => {

  return (
    <select
      onChange={event => onChange(event.target.value)}
      style={{ width: "100%" }}
      value={filter ? filter.value : "all"}
    > 
      <option value="">*</option>
      {items
        .map(item => item[fieldName])

        .filter((item, i, s) => s.lastIndexOf(item) == i)
        .map(function (value) {
          //log.debug('renderItem: ', value);
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
    </select>
  );
};