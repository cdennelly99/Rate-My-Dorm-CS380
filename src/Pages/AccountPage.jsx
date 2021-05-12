import { useContext, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import { Alert, Button, Container, Form, Media } from 'react-bootstrap';
import LoaderComponent from '../Components/LoaderComponent';
import { UserContext } from "../providers/UserProvider";
import { auth, firestore } from '../firebase';

const AccountPage = () => {
  const user = useContext(UserContext);
  const displayNameRef = useRef();
  const [error, setError] = useState(null);
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [displayNameChanged, setDisplayNameChanged] = useState(false);
  
  if (user === undefined) {
    return (
      <LoaderComponent />
    )
  } else if (user === null) {
    return (
      <Link to="/signin">
        Sign In
      </Link>
    )
  }
  const sendResetEmail = event => {
    event.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailHasBeenSent(true);
      })
      .catch((e) => {
        setError(e);
      });
  };

  const updateUserDisplayName = async (e) => {
    e.preventDefault();
    const userRef = firestore.doc(`users/${user.uid}`);
  
    try {
      await userRef.set({
        displayName: displayNameRef.current.value,
        email,
        photoURL,
      });

      setDisplayNameChanged(true);
    } catch (error) {
      setError(error);
    }
  }

  const { photoURL, displayName, email } = user;
  const avatar = photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png';

  return (
    <Container
      style={{
        marginTop: 'calc(2em + 70px)',
        width: '100%',
        minHeight: 'calc(100vh - 70px - 2em)',
      }}
    >
      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          <Alert.Heading>{error.code}</Alert.Heading>
          <p>{error.message}</p>
        </Alert>
      )}

      {emailHasBeenSent && (
        <Alert variant="success" dismissible onClick={() => setEmailHasBeenSent(false)}>
          An email has been sent to your address!
        </Alert>
      )}

      {displayNameChanged && (
        <Alert variant="success" dismissible onClick={() => setDisplayNameChanged(false)}>
          Display Name Changed!
        </Alert>
      )}
      <h1>Account Settings</h1>
      <Media>
        <img
          width={200}
          height={200}
          className="mr-3"
          src={avatar}
          alt="avatar"
        />
      </Media>
      <hr className="w-100 border" />
      <Form onSubmit={updateUserDisplayName}
      >
        <Form.Group controlId="displayName"
        >
          <Form.Label>Display Name: </Form.Label>
          <Form.Control
            type="text"
            defaultValue={displayName}
            ref={displayNameRef}
          />
        </Form.Group>
        <Button type="submit">Change Display Name</Button>
      </Form>
      <Form.Group controlId="email" style={{ marginTop: '1em' }}>
        <Form.Label>Email: </Form.Label>
        <Form.Control
          type="text"
          disabled
          defaultValue={email}
        />
      </Form.Group>
      <Button onClick={sendResetEmail}>
        Reset Password
      </Button>
    </Container>
  ) 
};
export default AccountPage;
