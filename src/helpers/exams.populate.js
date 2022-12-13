const { ColposcopiaModel } = require('../models/examen/colposcopia');
const { EcoMamaModel } = require('../models/examen/eco_mama');
const { ecoPelvicaModel } = require('../models/examen/eco_pelvica');

/* eslint-disable camelcase */
const population = {
  colposcopia: async ({ procedimiento, ...data }) => {
    const colposcopia = await ColposcopiaModel.findById(procedimiento).populate(
      ['cuelloUterino', 'hallasgosNormales', 'hallasgosAnormales']
    );

    return { ...data, procedimiento: colposcopia };
  },
  eco_mama: async ({ procedimiento, ...data }) => {
    const ecoMama = await EcoMamaModel.findById(procedimiento).populate([
      {
        path: 'exploracionFisica',
        populate: [
          {
            path: 'exploracionFisicaDerecho',
            populate: 'lesiones',
          },
          {
            path: 'exploracionFisicaIzquierdo',
            populate: 'lesiones',
          },
        ],
      },
      {
        path: 'ecografiaMama',
        populate: [
          {
            path: 'ecografiaMamaDerecho',
            populate: [{ path: 'lesiones', populate: 'sintomasBirads' }],
          },
          {
            path: 'ecografiaMamaIzquierdo',
            populate: [{ path: 'lesiones', populate: 'sintomasBirads' }],
          },
        ],
      },
    ]);

    return { ...data, procedimiento: ecoMama };
  },
  eco_pelvica: async ({ procedimiento, ...data }) => {
    const ecoPelvica = await ecoPelvicaModel.findById(procedimiento).populate([
      {
        path: 'utero',
        populate: ['miometrio', 'endometrio'],
      },
      {
        path: 'ovario',
        populate: [
          {
            path: 'ovarioDerecho',
            populate: 'masaAnexial',
          },
          {
            path: 'ovarioIzquierdo',
            populate: 'masaAnexial',
          },
        ],
      },
    ]);

    return { ...data, procedimiento: ecoPelvica };
  },
};

module.exports = async exams => {
  return await Promise.all(
    exams.map(async exam => {
      const { tipoExamen } = exam;
      const cleanTipoExamen = tipoExamen.split(' ')[0];
      return await population[cleanTipoExamen](exam);
    })
  );
};
