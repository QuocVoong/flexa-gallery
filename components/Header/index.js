import React, { memo, useEffect, useMemo } from 'react';
import { CloseIcon, HamburgerIcon }        from '@chakra-ui/icons';
import { Box, Flex, Text, Button }         from '@chakra-ui/react';
import Link                                from 'next/link';
import { useRouter }                       from 'next/router';
import styled                              from '@emotion/styled';
import { useDimensions }                   from '../useDimension';

const navItems = [
  {
    name:     'Home',
    to:       '/',
    eventKey: 0
  },
  {
    name:     'About',
    to:       '/about',
    eventKey: 1
  },
  {
    name:     'Features',
    to:       '/features',
    eventKey: 2
  },
  {
    name:     'Signup',
    to:       '/signup',
    children: <Button
                size="sm"
                rounded="md"
                color={['primary.500', 'primary.500', 'white', 'white']}
                bg={['white', 'white', 'primary.500', 'primary.500']}
                _hover={{
                  bg: [
                    'primary.100',
                    'primary.100',
                    'primary.600',
                    'primary.600',
                  ],
                }}
              >
                Create Account
              </Button>,
    eventKey: 4
  },
];

const MenuItem = ({ children, isLast, to = '/', ...rest }) => {
  return (
    <Text
      mb={{ base: isLast ? 4 : 8, sm: 0 }}
      mr={{ base: 8, sm: isLast ? 0 : 8 }}
      display="block"
      {...rest}
    >
      <Link href={`${to}`}>{children}</Link>
    </Text>
  );
};

const SlideMenuWrapper = styled(Flex)`
  position: relative;  
  #maker {
    position: absolute;
    left: 0;
    bottom: -8px;
    height: 6px;
    width: 0;
    border-radius: 4px;
    transition: 0.5s;
  }
`;

const SlideMenu = ({ navItems, ...rest }) => {
  const router                          = useRouter();
  const [{ height, width }, WrapperRef] = useDimensions();

  const activeKey = useMemo(() => {
    return (navItems.find(navItem => {
      return router.pathname === `${navItem.to}`;
    }) || { eventKey: '0' }).eventKey;
  }, [router]);

  useEffect(() => {
    if (WrapperRef.current) {
      const maker = WrapperRef.current.querySelector('#maker');
      const items = WrapperRef.current.querySelectorAll('.menu-item');

      maker.style.left  = items[activeKey].offsetLeft + 'px';
      maker.style.width = items[activeKey].offsetWidth + 'px';
    }
  }, [WrapperRef, activeKey, height, width]);

  return <SlideMenuWrapper
    align={['center', 'center', 'center', 'center']}
    justify={['center', 'space-between', 'flex-end', 'flex-end']}
    direction={['column', 'row', 'row', 'row']}
    pt={[4, 4, 0, 0]}
    ref={WrapperRef}
    {...rest}
  >
    <Box id="maker" bg={['white', 'white', 'primary.500', 'primary.500']}/>
    {navItems.map((navItem, index) => {
      return (
        <MenuItem key={navItem.eventKey} className="menu-item"
                  to={navItem.to} isLast={index === navItems.length - 1}>
          {navItem.children || navItem.name}
        </MenuItem>
      );
    })}
  </SlideMenuWrapper>;
};

const Header = (props) => {
  const [show, setShow] = React.useState(true);
  const toggleMenu      = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={8}
      bg={['primary.500', 'primary.500', 'transparent', 'transparent']}
      color={['white', 'white', 'primary.600', 'primary.600']}
      {...props}
    >
      <Flex align="center">
        <Box
          w="100px"
          color={['white', 'white', 'primary.500', 'primary.500']}
        >Logo</Box>
      </Flex>
      <Box display={{ base: 'block', md: 'none' }} onClick={toggleMenu}>
        {show ? <CloseIcon/> : <HamburgerIcon/>}
      </Box>
      <Box
        display={{ base: show ? 'block' : 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
      >
        <SlideMenu navItems={navItems}/>
      </Box>
    </Flex>
  );
};

export default memo(Header);