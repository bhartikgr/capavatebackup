import React, { useState } from 'react'
import {
  Star,
  CircleX,
  Archive,
  Trash2,
  Reply,
  Mail,
  MessagesSquare
} from 'lucide-react'
import logo from '../../assets/images/capavate.png'

const dummyNotes = [
  {
    id: 1,
    name: 'Avinay Kumar',
    role: 'Shareholder',
    time: '10:32 AM',
    subject: 'Query regarding Series A valuation',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et eum libero illum. Voluptate voluptatibus corrupti veritatis accusantium! Harum, numquam sed?',
    important: true
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Investor',
    time: 'Yesterday',
    subject: 'Document submission update',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et eum libero illum. Voluptate voluptatibus corrupti veritatis accusantium! Harum, numquam sed?',
    important: false
  },
  {
    id: 3,
    name: 'Rahul Verma',
    role: 'Shareholder',
    time: 'Feb 25',
    subject: 'Request for cap table access',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et eum libero illum. Voluptate voluptatibus corrupti veritatis accusantium! Harum, numquam sed?',
    important: false
  }
]

export default function ShareholderMessages() {
  const [notes, setNotes] = useState(dummyNotes)
  const [selectedNote, setSelectedNote] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleMarkImportant = () => {
    const updatedNotes = notes.map(note =>
      note.id === selectedNote.id
        ? { ...note, important: !note.important }
        : note
    )

    setNotes(updatedNotes)

    setSelectedNote({
      ...selectedNote,
      important: !selectedNote.important
    })
  }

  const handleDelete = () => {
    const updatedNotes = notes.filter(note => note.id !== selectedNote.id)
    setNotes(updatedNotes)

    setShowDeleteConfirm(false)
    setSelectedNote(null)

    console.log('Note deleted:', selectedNote.id)
  }

  const handleArchive = () => {
    const updatedNotes = notes.filter(note => note.id !== selectedNote.id)
    setNotes(updatedNotes)

    setSelectedNote(null)

    console.log('Note archived:', selectedNote.id)
  }

  const handleRespond = () => {
    console.log('Responding to note:', selectedNote.id)
  }

  return (
    <div className='container-fluid p-0 h-100 d-flex flex-column mesage-social '>
      <div className='d-flex align-items-center gap-3 pb-3 bg-white'>
        <MessagesSquare strokeWidth={1.8} size={24} color='#ff3e43' />
        <h4>Messages from Shareholders</h4>
      </div>

      <div
        className='bg-light custom_scroll'
        style={{
          maxHeight: 'calc(100vh - 120px)',
          overflowY: 'auto'
        }}
      >
        <div className='list-group list-group-flush'>
          {notes.map(note => (
            <button
              key={note.id}
              className={`list-group-item list-group-item-action py-3 px-0 pe-3 d-flex flex-column gap-3 border-bottom ${selectedNote?.id === note.id ? 'bg-white shadow-sm' : ''
                }`}
              onClick={() => setSelectedNote(note)}
            >
              <div className='d-flex justify-content-between align-items-start'>
                <div className='d-flex align-items-center gap-3 flex-grow-1'>
                  <div className='mess-profile'>
                    <img
                      src="https://images.unsplash.com/photo-1726722886957-2ed42b15aaa3?q=80&w=596&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt='Company logo'
                      className='w-100 h-100 object-fit-cover'
                    />
                  </div>
                  <div className='d-flex flex-column gap-1'>
                    <h5>{note.name}</h5>
                    <small className='text-muted'>
                      {note.role} • {note.time}
                    </small>
                  </div>
                </div>
                <div className=''>
                  <Star
                    strokeWidth={1}
                    fill={note.important ? '#ff3e43' : 'none'}
                    color={note.important ? '#ff3e43' : 'currentColor'}
                  />
                </div>
              </div>

              <h6>{note.subject}</h6>
            </button>
          ))}
        </div>
      </div>

      {selectedNote && (
        <div
          className='modal fade show d-block message-view'
          tabIndex='-1'
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
        >
          <div className='modal-dialog modal-dialog-centered modal-lg'>
            <div className='modal-content border-0 shadow-lg rounded-3'>
              <div className='modal-header border-0 pb-0 pt-4 px-4 d-flex align-items-start justify-content-between'>
                <div className='d-flex flex-column gap-3'>
                  <div className='d-flex align-items-center gap-2'>
                    <button
                      className={`btn p-0 border-0 ${selectedNote.important
                          ? 'text-primary'
                          : 'text-secondary'
                        }`}
                      onClick={handleMarkImportant}
                      style={{
                        color: selectedNote.important ? '#ff3e43' : '#adb5bd',
                        transition: 'color 0.2s ease'
                      }}
                      title={
                        selectedNote.important
                          ? 'Remove importance'
                          : 'Mark as important'
                      }
                    >
                      <Star
                        size={20}
                        fill={selectedNote.important ? '#ff3e43' : 'none'}
                        stroke={
                          selectedNote.important ? '#ff3e43' : 'currentColor'
                        }
                      />
                    </button>
                    <h5 className='fw-semibold'>{selectedNote.subject}</h5>
                  </div>
                  <div className='d-flex align-items-center gap-2 message-info'>
                    <Mail size={18} />
                    <p>{selectedNote.name}</p>
                    <p>•</p>
                    <p>{selectedNote.role}</p>
                    <p>•</p>
                    <p>{selectedNote.time}</p>
                  </div>
                </div>

                <button
                  type='button'
                  className='close_btn_pop'
                  onClick={() => setSelectedNote(null)}
                >
                  <CircleX />
                </button>
              </div>

              <div className='modal-body  px-4 py-4'>
                <div className='message-main'>
                  <p>{selectedNote.body}</p>
                </div>
              </div>

              <div className='modal-footer border-0 px-4 pb-4 pt-2 gap-2'>
                <button
                  className='py-2 su-creditb d-inline-flex align-items-center'
                  onClick={handleArchive}
                >
                  <Archive size={16} className='me-2' /> Archive
                </button>
                <button
                  className='py-2 creditb d-inline-flex align-items-center'
                  style={{
                    backgroundColor: '#ff3e43',
                    color: 'white',
                    border: 'none'
                  }}
                  onMouseEnter={e =>
                    (e.currentTarget.style.backgroundColor = '#e0353a')
                  }
                  onMouseLeave={e =>
                    (e.currentTarget.style.backgroundColor = '#ff3e43')
                  }
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <Trash2 size={16} className='me-2' /> Delete
                </button>
                <button
                  className='py-2 creditb bg-success ms-auto d-inline-flex align-items-center'
                  onClick={handleRespond}
                >
                  <Reply size={16} className='me-2' /> Respond
                </button>
              </div>
            </div>
          </div>

          {showDeleteConfirm && (
            <div
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999,
                backdropFilter: 'blur(5px)'
              }}
            >
              <div
                className='bg-white p-4 rounded-3 shadow-lg d-flex flex-column gap-3'
                style={{ maxWidth: '420px' }}
              >
                <div className='d-flex flex-column gap-2 message-info'>
                  <h6>Delete Note</h6>
                  <p>
                    Are you sure you want to delete this note? This action
                    cannot be undone.
                  </p>
                </div>
                <div className='d-flex gap-2 justify-content-end'>
                  <button
                    className='py-2 su-creditb'
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className='py-2 creditb border-0 text-white'
                    onClick={handleDelete}
                    style={{
                      backgroundColor: '#ff3e43'
                    }}
                    onMouseEnter={e =>
                      (e.currentTarget.style.backgroundColor = '#e0353a')
                    }
                    onMouseLeave={e =>
                      (e.currentTarget.style.backgroundColor = '#ff3e43')
                    }
                  >
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
