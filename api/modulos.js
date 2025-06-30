import cursos from '../cursos.json'; 
import modulos from '../modulos.json';

export default function handler(req, res) {
  const { nombre_curso } = req.query;

  if (!nombre_curso) {
    return res.status(400).json({ error: 'Parámetro requerido: nombre_curso' });
  }

  // Normalizar guiones bajos a espacios y pasar a minúsculas
  const nombreBuscado = nombre_curso.replace(/_/g, ' ').toLowerCase();

  // Buscar el curso en tu JSON
  const curso = cursos.find(c =>
    c.nombre.toLowerCase() === nombreBuscado
  );

  if (!curso) {
    return res.status(404).json({ error: 'Curso no encontrado' });
  }

  // Filtrar todos los módulos que tengan ese id_curso
  const modulosDelCurso = modulos.filter(m => m.id_curso === curso.id);

  // Devolver ambos: datos del curso y arreglo de módulos
  return res.status(200).json({
    curso: {
      id: curso.id,
      nombre: curso.nombre,
      nivel: curso.nivel,
      duracion: curso.duracion,
      tecnologia: curso.tecnologia,
      fecha: curso.fecha,
      imagen: curso.imagen,
      descripcion: curso.descripcion
    },
    modulos: modulosDelCurso
  });
}
