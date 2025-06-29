import modulos from '../modulos.json';

export default function handler(req, res) {
  const { id_curso, titulo } = req.query;

  // Filtrar por ID del curso
  if (id_curso) {
    const relacionados = modulos.filter(m =>
      m.id_curso === parseInt(id_curso)
    );
    return relacionados.length
      ? res.status(200).json(relacionados)
      : res.status(404).json({ error: 'No se encontraron módulos para este curso' });
  }

  // Filtrar por título parcial
  if (titulo) {
    const coincidencias = modulos.filter(m =>
      m.titulo.toLowerCase().includes(titulo.toLowerCase())
    );
    return coincidencias.length
      ? res.status(200).json(coincidencias)
      : res.status(404).json({ error: 'No se encontraron módulos con ese título' });
  }

  // Devolver todos los módulos
  res.status(200).json(modulos);
}
