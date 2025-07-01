import cursos from '../cursos.json';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id, nombre } = req.query;

  if (id) {
    const curso = cursos.find(c => c.id === parseInt(id));
    return curso
      ? res.status(200).json(curso)
      : res.status(404).json({ error: 'Curso no encontrado' });
  }

  if (nombre) {
    const coincidencias = cursos.filter(c =>
      c.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
    return res.status(200).json(coincidencias);
  }

  res.status(200).json(cursos);
}