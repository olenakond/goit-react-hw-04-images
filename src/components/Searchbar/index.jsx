import { useState } from 'react';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { Header, Form, Button, Label, Input } from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInput = ({ target: { value } }) => {
    setSearchValue(value);
  };

  return (
    <Header>
      <Form onSubmit={onSubmit}>
        <Button type="submit">
          <Label>Search</Label>
          <HiOutlineMagnifyingGlass size="22" />
        </Button>
        <Input
          onChange={handleInput}
          type="text"
          name="name"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
        />
      </Form>
    </Header>
  );
};

export default Searchbar;
