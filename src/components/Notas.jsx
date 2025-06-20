
import { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaCalendarAlt } from 'react-icons/fa';

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

export const ElectricianNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Cargar notas al iniciar
  useEffect(() => {
    const savedNotes = localStorage.getItem('electrician-notes');
    setNotes(savedNotes ? JSON.parse(savedNotes) : []);
    setIsLoaded(true);
  }, []);

  // 2. Guardar automáticamente
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('electrician-notes', JSON.stringify(notes));
    }
  }, [notes, isLoaded]);

  // 3. Crear nueva nota
  const createNote = () => {
    const newNote: Note = {
      id: Date.now(),
      title: '',
      content: '',
      createdAt: new Date().toLocaleString('es-ES', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setNotes([newNote, ...notes]);
  };

  // 4. Actualizar nota
  const updateNote = (id: number, field: keyof Note, value: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, [field]: value } : note
    ));
  };

  // 5. Eliminar nota
  const deleteNote = (id: number) => {
    if (confirm('¿Borrar esta nota permanentemente?')) {
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  // 6. Limpiar todo
  const clearAllNotes = () => {
    if (confirm('⚠ ¿Borrar TODAS las notas? Esto no se puede deshacer.')) {
      setNotes([]);
    }
  };

  return (
    <div className="electrician-notes">
      {/* Header */}
      <div className="notes-header">
        <h2>
          <span className="icon-bolt">⚡</span> Notas de Trabajo
        </h2>
        <div className="notes-controls">
          <button onClick={createNote} className="btn-new">
            <FaPlus /> Nueva
          </button>
          <button onClick={clearAllNotes} className="btn-clear">
            <FaTrash /> Limpiar
          </button>
        </div>
      </div>

      {/* Lista de notas */}
      <div className="notes-list">
        {notes.length === 0 ? (
          <div className="empty-state">
            <p>No hay notas aún</p>
            <button onClick={createNote} className="btn-primary">
              <FaPlus /> Crear primera nota
            </button>
          </div>
        ) : (
          notes.map(note => (
            <div key={note.id} className="note-card">
              <div className="note-header">
                <input
                  type="text"
                  value={note.title}
                  onChange={(e) => updateNote(note.id, 'title', e.target.value)}
                  placeholder="Ej: Materiales para instalación"
                  className="note-title"
                />
                <button onClick={() => deleteNote(note.id)} className="btn-delete">
                  <FaTrash />
                </button>
              </div>
              <textarea
                value={note.content}
                onChange={(e) => updateNote(note.id, 'content', e.target.value)}
                placeholder="Detalles..."
                className="note-content"
              />
              <div className="note-footer">
                <FaCalendarAlt className="icon-calendar" />
                <span>{note.createdAt}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Estilos */}
      <style jsx>{`
        .electrician-notes {
          max-width: 600px;
          margin: 0 auto;
          padding: 1rem;
          font-family: 'Segoe UI', sans-serif;
        }
        .notes-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        .notes-header h2 {
          font-size: 1.5rem;
          color: #2d3748;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .icon-bolt {
          font-size: 1.8rem;
        }
        .notes-controls {
          display: flex;
          gap: 0.5rem;
        }
        button {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }
        .btn-new {
          background: #4299e1;
          color: white;
        }
        .btn-new:hover {
          background: #3182ce;
        }
        .btn-clear {
          background: #e53e3e;
          color: white;
        }
        .btn-clear:hover {
          background: #c53030;
        }
        .btn-primary {
          background: #48bb78;
          color: white;
          margin-top: 1rem;
        }
        .btn-primary:hover {
          background: #38a169;
        }
        .btn-delete {
          background: none;
          color: #e53e3e;
          padding: 0.3rem;
        }
        .empty-state {
          text-align: center;
          padding: 2rem;
          background: #f7fafc;
          border-radius: 8px;
          border: 1px dashed #cbd5e0;
        }
        .empty-state p {
          color: #718096;
          margin-bottom: 1rem;
        }
        .notes-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .note-card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          padding: 1rem;
        }
        .note-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        .note-title {
          flex-grow: 1;
          font-weight: 600;
          font-size: 1.1rem;
          border: none;
          border-bottom: 2px solid #edf2f7;
          padding: 0.3rem 0;
          outline: none;
        }
        .note-title:focus {
          border-color: #4299e1;
        }
        .note-content {
          width: 100%;
          min-height: 100px;
          padding: 0.5rem;
          border: 1px solid #e2e8f0;
          border-radius: 4px;
          resize: vertical;
          font-family: inherit;
        }
        .note-content:focus {
          outline: none;
          border-color: #4299e1;
          box-shadow: 0 0 0 1px #4299e1;
        }
        .note-footer {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.8rem;
          color: #718096;
          margin-top: 0.5rem;
        }
        .icon-calendar {
          font-size: 0.7rem;
        }
      `}</style>
    </div>
  );
};
