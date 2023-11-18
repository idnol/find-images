import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    formVal: ''
  }
  handleInput = (e) => {
    this.setState({ formVal: e.target.value });
  }
  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.formVal);
    this.setState({formVal: ''})
  }
  render() {
    return <SearchFormStyled onSubmit={this.handleFormSubmit}>
              <FormBtn type="submit">
                <FiSearch size="16px" />
              </FormBtn>
              <InputSearch
                placeholder="What do you want to write?"
                name="search"
                required
                autoFocus
                onChange={this.handleInput}
                value={this.state.formVal}
              />
          </SearchFormStyled>
  }
}
