import cursos from '../cursos.json'; 
import modulos from '../modulos.json';

export default function handler(req, res) {
  const { nombre_curso } = req.query;

  console.log('Nombre curso recibido:', nombre_curso);

  if (!nombre_curso) {
    return res.status(400).json({ error: 'Parámetro requerido: nombre_curso' });
  }

  const nombreBuscado = nombre_curso.replace(/_/g, ' ').toLowerCase();
  console.log('Nombre buscado normalizado:', nombreBuscado);

  const curso = cursos.find(c =>
    c.nombre.toLowerCase() === nombreBuscado
  );

  if (!curso) {
    console.log('Curso no encontrado');
    return res.status(404).json({ error: 'Curso no encontrado' });
  }

  console.log('Curso encontrado:', curso);

  const modulosDelCurso = modulos.filter(m => m.id_curso === curso.id);
  return res.status(200).json(modulosDelCurso);
}
