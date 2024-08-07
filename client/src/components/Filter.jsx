import React from "react";
import { Form, Link } from "react-router-dom";
import FormInput from "./Forms/FormInput";
import FormSelect from "./Forms/FormSelect";

const Filter = () => {
  const categories = ["shoes", "t-shirts", "shirts", "pants"];

  return (
    <Form
      method="get"
      className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-3 grid-cols-2 items-center"
    >
      <FormInput label="Search Product" type="search" name="name" />
      <FormSelect label="select category" name="category" list={categories} />
      <button type="submit" className="btn btn-primary">Search</button>
      <Link to="/products" className="btn btn-accent">Reset</Link>
    </Form>
  );
};

export default Filter;
