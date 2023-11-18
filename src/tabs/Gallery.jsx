import { Component } from 'react';

import {getImages} from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    val: '',
    page: 1,
    images: [],
    total: 0
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.val !== this.state.val || prevState.page !== this.state.page) {
      this.fetchImages(this.state.val, this.state.page);
    }
  }

  fetchImages = async (query, page) => {
    try {
      const data = await getImages(query, page);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  handleSubmit = (e) => {
    this.setState({ val: e });
  }
  render() {
    console.log(this.state.val)
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        {/* <Text textAlign="center">Sorry. There are no images ... 😭</Text> */}
      </>
    );
  }
}
