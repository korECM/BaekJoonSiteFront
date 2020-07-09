import React from 'react';
import AuthTemplate from '../AuthTemplate';
import JoinForm from './JoinForm';

export interface JoinProps {
  from: string;
}

function Join({ from }: JoinProps) {
  return (
    <AuthTemplate>
      <JoinForm />
    </AuthTemplate>
  );
}

export default Join;
