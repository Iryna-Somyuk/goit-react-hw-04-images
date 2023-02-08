import { Component } from 'react';
import { AppContainer } from './App.styled';
import { fetchImages } from 'Services/api.Services';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';
import { Notification } from './ErrorMessage/ErrorMessage';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    totalImages: 0,
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      try {
        const resp = await fetchImages(query, page);
        if (resp) {
          this.setState(prev => ({
            images:
              page === 1 ? [...resp.hits] : [...prev.images, ...resp.hits],
            totalImages: resp.totalHits,
          }));

          if (!resp.totalHits) {
            toast.error(
              'Sorry, there are no images matching your search query. Please try again!',
              {
                duration: 4000,
              }
            );
            return;
          }
        }
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handelSubmit = query => {
    console.log(query);
    this.setState({ query, isLoading: true, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1, isLoading: true }));
  };

  renderButtonOrLoader = () => {
    const { isLoading, images, totalImages } = this.state;
    return isLoading ? (
      <Loader />
    ) : (
      !!images.length && images.length < totalImages && (
        <Button onLoadMore={this.handleLoadMore} />
      )
    );
  };

  render() {
    const { images, error } = this.state;
    return (
      <AppContainer>
        <Searchbar onSubmit={this.handelSubmit} />
        {error && <Notification />}

        <ImageGallery images={images} />

        {this.renderButtonOrLoader()}
        <Toaster position="top-center" reverseOrder={true} />
      </AppContainer>
    );
  }
}
