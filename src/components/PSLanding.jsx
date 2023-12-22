import React from 'react';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row-reverse', 
        justifyContent: 'space-between',
        alignItems: 'center', 
        backgroundColor: '#CCCCFF',
        color: 'Black'
    },
    content: {
        marginLeft: '10%',
      order: 2,
    paddingRight:'20px',
    textAlign: 'justify'
    },
    image: {
      order: 1,
      
     
    },
  };
  
 
  const mediaQuery = '@media (min-width: 768px)';
  
  Object.assign(styles, {
    [mediaQuery]: {
      container: {
        flexDirection: 'row',
      },
    },
  });

const PSLanding = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 >Problem</h1>
        <p>The lack of sufficient and reliable cold storage facilities in Pakistan's agricultural sector, 
particularly in rural areas, poses a significant challenge for farmers who aim to export their 
products. Existing cold storage facilities in urban areas suffer from poor quality, outdated 
equipment, unqualified staff, and limited competition, leading to high costs for farmers and 
crop spoilage.</p>
<h1>Solution</h1>
        <p>This is a platform where we can connect both farmers and cold storage's
where farmer can avail services to store products in cold storage and cold storage can
generate revenue by selling these services.</p>
      </div>
      <div style={styles.image}>
        <img src="ourlogo.png" alt="imag" />
      </div>
    </div>
  );
};

export default PSLanding;