import modulo from '../modulos.json';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  const { id_curso, titulo } = req.query;

  let resultados = modulo;

  if (id_curso) {
    resultados = resultados.filter(item => item.id_curso === parseInt(id_curso));
  }

  if (titulo) {
    const tituloLower = titulo.toLowerCase();
    resultados = resultados.filter(item =>
      item.titulo.toLowerCase().includes(tituloLower)
    );
  }

  if (resultados.length === 0) {
    return res.status(404).json({ error: 'No se encontraron módulos que coincidan' });
  }

  res.status(200).json(resultados);
}
