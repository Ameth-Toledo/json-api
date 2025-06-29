import cursos from './cursos.json';  // Tu lista de cursos
import modulos from './modulos.json'; // Tus módulos

export default function handler(req, res) {
  const { nombre_curso } = req.query;

  if (nombre_curso) {
    // Convertir a formato normal (con espacios)
    const nombreBuscado = nombre_curso.replace(/_/g, ' ').toLowerCase();

    // Buscar curso por nombre
    const curso = cursos.find(c =>
      c.nombre.toLowerCase() === nombreBuscado
    );

    if (!curso) {
      return res.status(404).json({ error: 'Curso no encontrado' });
    }

    // Obtener los módulos que pertenecen al curso
    const modulosDelCurso = modulos.filter(m => m.id_curso === curso.id);
    return res.status(200).json(modulosDelCurso);
  }

  // Si no se pasa nombre_curso
  res.status(400).json({ error: 'Parámetro requerido: nombre_curso' });
}
