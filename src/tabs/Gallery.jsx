import { Component } from 'react';

import { getImages } from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    val: '',
    page: 1,
    images: [],
    total: 0,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.val !== this.state.val ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages(this.state.val, this.state.page);
    }
  }

  fetchImages = async (query, page) => {
    try {
      const { photos, total_results } = await getImages(query, page);

      this.setState(prevState => ({
        images: [...prevState.images, ...photos],
        total: total_results,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  handleSubmit = e => {
    this.setState({
      val: e,
      page: 1,
      images: [],
      total: 0,
      error: null,
    });
  };

  btnClickLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    const { images, total, error, val } = this.state;
    console.log(this.state.val);
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        {error && <Text textAlign="center">Sorry {error}😭</Text>}
        {images.length === 0 && val !== '' && (
          <Text textAlign="center">Sorry. Bad request {val} 😭</Text>
        )}
        <Grid>
          {images.map(({ src: { large }, alt, avg_color, id }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img src={large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        {total > images.length && (
          <Button onClick={this.btnClickLoadMore}> Load more</Button>
        )}
      </>
    );
  }
}
