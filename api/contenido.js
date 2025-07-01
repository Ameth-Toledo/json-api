import contenido from '../contenido.json';
import modulos from '../modulos.json';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id_modulo } = req.query;

  if (id_modulo) {
    const moduloId = parseInt(id_modulo);
    
    const moduloInfo = modulos.find(m => m.id === moduloId);
    
    const contenidoModulo = contenido.filter(c => c.id_modulo === moduloId);
    
    if (!moduloInfo || contenidoModulo.length === 0) {
      return res.status(404).json({ error: 'Módulo no encontrado' });
    }

    const resultado = contenidoModulo.map(item => ({
      ...item,
      titulo: moduloInfo.titulo,
      descripcion: moduloInfo.descripcion,
      video_url: item.video_url || "",
      repositorio: item.repositorio || ""
    }));

    return res.status(200).json(resultado);
  }

  const resultadoCompleto = contenido.map(item => {
    const moduloInfo = modulos.find(m => m.id === item.id_modulo);
    return {
      ...item,
      titulo: moduloInfo?.titulo || "Sin título",
      descripcion: moduloInfo?.descripcion || "Sin descripción",
      video_url: item.video_url || "",
      repositorio: item.repositorio || ""
    };
  });

  res.status(200).json(resultadoCompleto);
}