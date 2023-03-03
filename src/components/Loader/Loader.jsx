import { Spin } from './Loader.styled';

const { Dna } = require('react-loader-spinner');

export const Loader = () => {
  return (
    <Spin>
      <Dna
        visible={true}
        height="100"
        width="100"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </Spin>
  );
};
