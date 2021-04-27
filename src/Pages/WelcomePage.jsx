/* Dev: Eli McCoy
 * Date: 4/22/21
 * Desc: Welcome page component.
 */

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import '../Styles/WelcomePage.css'
import {Button, 
        Container,
        Row,
        Col,
        Carousel
      } from 'react-bootstrap'
import TopBarComponent from "../Components/TopBarComponent";

class WelcomePage extends Component {

  //===navigateToPage===
  //Desc: Handles navigation to next page.
  navigateToPage(Page) {
    this.props.history.push({pathname: Page});
  }

  //===componentDidMount===
  //Desc: JS for once the render method is mounted.
  componentDidMount() {
  }

  //===render===
  //Desc: Renders the html.
  render() {
    return(
      
      <div className='mainDivSection'>

        <TopBarComponent/>
        
        <Container className='mainSection'>

          <Row className='titleRow'>
            CWU Rate My Dorm
          </Row>

          <Row className='buttonRow'>

            <Col className='buttonBoxLeft'>
              <Button size='lg' variant="danger">Write a Review</Button>
            </Col>
            <Col className='buttonBoxRight' onClick={()=>{this.navigateToPage("MapPage")}}>
              <Button size='lg' variant="danger">Read Reviews</Button>
            </Col>

          </Row>

          <Row className='imageRow'>

            <Carousel className='carouselSize'>
              <Carousel.Item>
                <img
                  className='imageSize'
                  src="https://www.kpq.com/wp-content/uploads/2018/07/CWU.jpg"
                  alt="First slide"
                />
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className='imageSize'
                  src="https://katu.com/resources/media/b2bd1ced-1737-478c-92d9-fa0fc374d6a2-large16x9_190419_pio_central_washington_university_cwu.jpg?1555702482536"
                  alt="First slide"
                />
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className='imageSize'
                  src="https://www.kpq.com/wp-content/uploads/2018/07/CWU.jpg"
                  alt="First slide"
                />
              </Carousel.Item>
            </Carousel>

          </Row>

        </Container>

      </div>
    );
  }
}

export default withRouter(WelcomePage);