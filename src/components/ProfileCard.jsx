import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function ProfileCard({ id, name, likes, onLike, onDelete, onEdit }) {
    return (
        <Card className="mb-3 shadow-sm">
            <Card.Body>
                <Card.Title className="h5 mb-1">{name}</Card.Title>
                <Card.Text className="mb-2">
                    Likes: <strong>{likes}</strong>
                </Card.Text>


                <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => onLike(id)}
                >
                    Like
                </Button>


                <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => onEdit(id, name)}
                >
                    Edit
                </Button>


                <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(id)}
                >
                    Delete
                </Button>
            </Card.Body>
        </Card>
    );
}