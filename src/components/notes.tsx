import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  Grid,
  Dimmer,
  Loader,
  Image,
  Segment,
  Icon,
  Button,
} from "semantic-ui-react";
import api from "../API/api";
import { AxiosResponse } from "axios";
import { Link } from "react-router-dom";

interface IProps {
  title: string;
  _id: string;
}

const Note: React.FC<IProps> = ({ title, _id }) => {
  const deleteMethod = (_id: IProps["_id"]) => {
    api.delete(`/api/notes/${_id}`).catch((err: Error) => console.log(err));
  };

  return (
    <Grid celled>
      <Grid.Row>
        <Grid.Column width={10}>
          <div
            style={{ marginTop: "4%", marginBottom: "3%", marginLeft: "3%" }}
          >
            <Header as="h2">
              <Icon name="file outline" /> {title}
            </Header>
          </div>
        </Grid.Column>
        <Grid.Column width={6}>
          <Segment textAlign="center">
            <Button
              icon
              size="big"
              as={Link}
              to={"/edit-note/" + _id}
              basic
              color="blue"
            >
              <Icon name="edit outline" />
            </Button>
            {"     "}
            <Button
              icon
              size="big"
              basic
              color="red"
              onClick={() => deleteMethod(_id)}
            >
              <Icon name="trash alternate outline" />
            </Button>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Array<any> | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("uid")) {
      window.location.pathname = "/login";
    } else {
      createNotes();
    }
  });

  const createNotes = () => {
    let currNotes = [];
    api
      .get(`/api/notes/${localStorage.getItem("uid")}`)
      .then((res: AxiosResponse) => {
        currNotes = res.data;
        currNotes.reverse();
        setNotes(
          currNotes.map((note: { title: string; _id: string }) => {
            return <Note title={note.title} _id={note._id} />;
          })
        );
      });
  };

  return (
    <Container>
      <Header size="large" floated="left">
        Notes:
      </Header>
      <Button
        floated="right"
        size="medium"
        icon
        basic
        color="green"
        as={Link}
        to="/create-note"
      >
        <Icon name="add" />
      </Button>
      <div>
        {notes || (
          <Segment>
            <Dimmer active inverted>
              <Loader inverted content="Loading" />
            </Dimmer>
            <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
          </Segment>
        )}
      </div>
    </Container>
  );
};

export default Notes;
