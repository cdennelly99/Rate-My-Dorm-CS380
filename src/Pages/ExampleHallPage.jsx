import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {getReviewsByDormName, getDormByName} from '../firestore'
import {Container, Row, Carousel, Card, Button} from 'react-bootstrap'
import LoaderComponent from '../Components/LoaderComponent';
import XButton from '../Assets/xButton.png'
import ExampleStyles from '../Styles/ExampleHallPage.module.css';

class ExampleHallPage extends Component {

  constructor(props)
  {
    super(props);
    this.state = 
    {
      hallName: this.props.location.state.hallName,
      hallReviews: null,
      hallDocs: null,
      hallImages: null,
      hallDescription: null,
      hallRating: null,
      currentUserImage: null,
      displayCurUserImage: false,
      loaded: false
    }

    //bind the class functions with this.
    this.generateReviews = this.generateReviews.bind(this);
    this.generateImages = this.generateImages.bind(this);
    this.userImagePopup = this.userImagePopup.bind(this);
  }

  //===navigateToPage===
  //Desc: Handles navigation to next page.
  navigateToPage(toPass) {
    this.props.history.push({pathname: "/", state:{hallName: toPass}});
  }

  //===componentDidMount===
  //Desc: JS for once the render method is mounted.
  componentDidMount()
  {
    //Loading Hall reviews and information from database.
    getReviewsByDormName(this.state.hallName)
    .then((result)=>{
       
      this.setState({hallReviews: result});

    }
    ).then(()=>{

      getDormByName(this.state.hallName)
      .then((dormNameResult) => {
        this.setState({hallDocs: dormNameResult});
        this.setState({hallImages: dormNameResult.get("images")});
        this.setState({hallDescription: dormNameResult.get("description")});
        this.setState({hallRating: dormNameResult.get("rating")});
        this.setState({loaded: true});
      });

    });
  }

  //===userImagePopup===
  //Desc: Displays a pop up image for the user.
  userImagePopup() 
  {
    return (
      <div className={ExampleStyles.userImagePopUp}>
        <img className={ExampleStyles.userImage} src={this.state.currentUserImage}/>
        <img className={ExampleStyles.topcorner} src={XButton} onClick={()=>{this.setState({displayCurUserImage: false})}}/>
      </div>
    );
  }

  //===generateReviews===
  //Desc: Genereates reviews from database values.
  generateReviews(props) 
  {
    const reviewsToAdd = props.reviews;

    const toReturn = reviewsToAdd.map((curReview) =>

      <div className={ExampleStyles.reviewTemplate}>
        <div className={ExampleStyles.reviewTemplateTitle}>

          <div className={ExampleStyles.reviewTemplateTitleCol}>
            Author: {curReview.get("author")}
          </div>

        </div>

        <div className={ExampleStyles.reviewTemplateBody}>
          
          <div className={ExampleStyles.reviewTemplateDesc}>
            {curReview.get("review")}
          </div>

          <div className={ExampleStyles.reviewTemplateImages}>
            <h5>User Images:</h5>
            <img className={ExampleStyles.reviewTemplateImageBorder} 
                 src={curReview.get("images")} 
                alt=""
                onClick={ ()=>{
                                this.setState({displayCurUserImage: true});
                                this.setState({currentUserImage: curReview.get("images")});
                              }
              }
            />
          </div>
          
          <div className={ExampleStyles.reviewTemplateRight}>
            <h3>Overall Rating: {curReview.get("overallRating")}</h3>
            <p><b>First Quarter: </b>{curReview.get("firstQuarter")}</p>
            <p><b>Last Quarter: </b>{curReview.get("lastQuarter")}</p>
            <p><b>Cleanliness Rating: </b>{curReview.get("cleanlinessRating")}</p>
            <p><b>Furniture Rating: </b>{curReview.get("furnitureRating")}</p>
            <p><b>Location Rating: </b>{curReview.get("locationRating")}</p>
            <p><b>Room Size Rating: </b>{curReview.get("roomSizeRating")}</p>
            <p><b>Room Type:</b> {curReview.get("roomType")}</p>
            <p><b>Floor: </b>{curReview.get("floor")}</p>
          </div>
         
        </div>

      </div>
    );

    return(
      <div className={ExampleStyles.reviewsBlock}>
        {toReturn}
      </div>
    );
  }

  //===generateImages===
  //Desc: Genereates images from database values.
  generateImages(props) 
  {
    const imagesToAdd = props.images;

    const toReturn = imagesToAdd.map((curImage) => 
    
      <Carousel.Item>
        <img
          className={ExampleStyles.carouselImageExample}
          src={curImage}
          alt=""
        />
      </Carousel.Item>
    
    );

    return(
      <Carousel className={ExampleStyles.imageCarousel}>
        {toReturn}
      </Carousel>
    );
  }

  //===render===
  //Desc: Renders the html.
  render()
  {
    
    if(this.state.loaded)
    {
      return (
        <div>

          {this.state.displayCurUserImage ? <this.userImagePopup/>: null}

          <Container fluid className={ExampleStyles.mainContainer}>

            <Container className={ExampleStyles.middleSection}>

              <Row className={ExampleStyles.infoAndTopReviewSection}>

                <div className={ExampleStyles.titleAndInformationSection}>

                  <div className={ExampleStyles.titleBlock}>
                    {this.state.hallName}
                  </div>

                  <div className={ExampleStyles.imageGalleryBlock}>

                    <div className={ExampleStyles.imageCarouselSection}>
                      {<this.generateImages images={this.state.hallImages} />}
                    </div>

                    <div className={ExampleStyles.infoBlock}>
                      <Card bg={'light'} className={ExampleStyles.infoCard}>
                        <Card.Header><b>Hall Information:</b></Card.Header>
                        <Card.Body>
                          <Card.Text>
                            <h3>Average Hall Rating: {this.state.hallRating}</h3>
                            <br />
                            <h5>Description:</h5>
                            {this.state.hallDescription}
                            <br />
                            <br />
                            <Button variant="primary" onClick={() => { this.navigateToPage("InfoPage") }}>More Info</Button>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>

                  </div>

                </div>

              </Row>

              <Row className={ExampleStyles.reviewsTitle}>
                <h1>User Reviews:</h1>
              </Row>

              <Row className={ExampleStyles.reviewsSection}>
                <this.generateReviews reviews={this.state.hallReviews} />
              </Row>

              <Row className={ExampleStyles.footer}></Row>

            </Container>

          </Container>
        </div>
      )
    }
    else //List is still loading. 
    {
      return(<LoaderComponent />);
    }
    
  }

}

export default withRouter(ExampleHallPage);