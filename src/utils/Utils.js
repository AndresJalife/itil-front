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
  let permisos =  { // 0 = nada, 1 = vista, 2 = creado/borrado
    'auth0|629e61b46f7f59006922f069':{ // admin
      "configuracion":2,
      "incidentes": 2,
      "problemas": 2,
      "cambios": 2,
      "errores": 2
    },
    'auth0|629e61d64925f70068971b41':{// soporte
      "configuracion":1,
      "incidentes": 1,
      "problemas": 2,
      "cambios": 2,
      "errores": 2
    },
    'auth0|62a357a84b6448c8e4f8684c':{//normal
      "configuracion":1,
      "incidentes": 2,
      "problemas": 0,
      "cambios": 0,
      "errores": 0
    }
  }[id]

  return permisos
  //return (name == undefined ? "Usuario desconocido" : name)

}

export const simplifyDate = (date) => {
  return date.substring(5, 22)
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