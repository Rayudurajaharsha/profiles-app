import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ProfileCard from './components/ProfileCard.jsx';
import { profiles as initialProfiles } from './data/profiles.js';

export default function App() {
  const [people, setPeople] = useState(initialProfiles);
  const [name, setName] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [filterTerm, setFilterTerm] = useState('');


  const handleLike = (id) => {
    setPeople(prevPeople => {
      return prevPeople.map(person => {
        if (person.id === id) {
          return { ...person, likes: person.likes + 1 };
        }
        return person;
      });
    });
  };

  const handleDelete = (id) => {
    setPeople(prevPeople => prevPeople.filter(person => person.id !== id));
  };

  const handleEdit = (id, currentName) => {
    const newName = prompt(`Enter new name for ${currentName}:`, currentName);

    if (newName === null || newName.trim() === currentName.trim()) {
      return;
    }

    const trimmedName = newName.trim();
    const exists = people.some(p => p.id !== id && p.name.toLowerCase() === trimmedName.toLowerCase());

    if (trimmedName.length === 0) {
      alert("Name cannot be empty.");
      return;
    }
    if (exists) {
      alert(`Profile for "${trimmedName}" already exists.`);
      return;
    }

    setPeople(prevPeople => {
      return prevPeople.map(person => {
        if (person.id === id) {
          return { ...person, name: trimmedName };
        }
        return person;
      });
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const exists = people.some(p => p.name.toLowerCase() === trimmedName.toLowerCase());

    if (trimmedName.length === 0) {
      setValidationError('Name is required.');
      setIsInvalid(true);
      return;
    }
    if (exists) {
      setValidationError(`Profile for "${trimmedName}" already exists.`);
      setIsInvalid(true);
      return;
    }

    setValidationError('');
    setIsInvalid(false);

    const newProfile = {
      id: Date.now(),
      name: trimmedName,
      likes: 0
    };

    setPeople(prevPeople => [...prevPeople, newProfile]);
    setName('');
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    if (isInvalid) {
      setIsInvalid(false);
      setValidationError('');
    }
  };

  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(filterTerm.toLowerCase())
  );

  const sortedPeople = [...filteredPeople].sort((a, b) => b.likes - a.likes);

  return (
    <Container className="py-4">
      <h1 className="mb-4 text-center">Profiles</h1>

      <Row className="mb-4 justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
            <Form.Group className="mb-3" controlId="formProfileName">
              <Form.Label>New Profile Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={handleNameChange}
                isInvalid={isInvalid}
              />
              <Form.Control.Feedback type="invalid">
                {validationError}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="success" type="submit">
              Add Profile
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="mb-4 justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form.Control
            type="text"
            placeholder="Filter profiles by name..."
            value={filterTerm}
            onChange={e => setFilterTerm(e.target.value)}
          />
        </Col>
      </Row>

      <Row xs={1} md={2} lg={3}>
        {sortedPeople.map(p => (
          <Col key={p.id}>
            <ProfileCard
              id={p.id}
              name={p.name}
              likes={p.likes}
              onLike={handleLike}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </Col>
        ))}
        {sortedPeople.length === 0 && (
          <Col xs={12} className="text-center text-muted mt-3">
            No profiles found matching "{filterTerm}".
          </Col>
        )}
      </Row>
      <p className="text-center text-muted mt-5">&copy; 2025 RRH</p>
    </Container>
  );
}