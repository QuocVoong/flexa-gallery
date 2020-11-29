import React, { memo } from 'react';
import { Flex }   from '@chakra-ui/react';
import Header          from '../Header';

const MainLayout = ({ children }) => {
  return (
    <>
      <Flex
        direction="column"
        align="center"
        maxW={{ xl: '1200px' }}
        m="0 auto"
      >
        <>
          <Header />
          {children}
        </>
      </Flex>
    </>
  );
};

export default memo(MainLayout);