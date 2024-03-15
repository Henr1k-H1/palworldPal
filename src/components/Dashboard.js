import React, { useState, useEffect } from "react";

import regularPalsData from "../palsRegular.json";
// import alphaPalsData from "../palsAlphas.json";

const Dashboard = () => {
  const [regularPals, setregularPals] = useState(regularPalsData.sort((a, b) => a.zukanindex > b.zukanindex ? 1 : -1));
  // const [alphaPals, setAlphaPals] = useState(alphaPalsData);

  const [order, setOrder] = useState('ASC');
  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    setregularPals(regularPalsData.filter((item) =>item.name.toLowerCase().includes(search.toLowerCase())))
  }, [search])

  const sorting = (col) => {
    console.log(order, col)
    if (order === 'ASC') {
      const sorted = [...regularPals].sort((a, b) => 
        a[col] > b[col] ? 1 : -1
      )
      setregularPals(sorted)
      setOrder('DSC')
    }
    if (order === 'DSC') {
      const sorted = [...regularPals].sort((a, b) =>
        a[col] < b[col] ? 1 : -1
      )
      setregularPals(sorted)
      setOrder('ASC')
    }
  }

  const decipherType = (type) => {
    const cleanType = type.split("::")

    switch(cleanType[1]) {
      case 'Leaf':
        return <span className="text-leaf">Leaf</span>
        break
      case 'Fire':
        return <span className="text-fire">Fire</span>
        break
      case 'Water':
        return <span className="text-water">Water</span>
        break
      case 'Electricity':
        return <span className="text-electric">Electricity</span>
        break
      case 'Ice':
        return <span className="text-ice">Ice</span>
        break
      case 'Dark':
        return <span className="text-dark">Dark</span>
        break
      case 'Earth':
        return <span className="text-earth">Earth</span>
        break
      case 'Dragon':
        return <span className="text-dragon">Dragon</span>
        break
      case 'Normal':
        return <span className="text-normal">Normal</span>
        break
      default:
        return <span className="text-normal"></span>
    } 
  }

  const cleanRarity = (rarity) => {
    switch(rarity) {
      case 20:
        return <span className="text-legendary pill">Legendary</span>
        break
      case 10:
        return <span className="text-epic pill">Epic</span>
        break
      case 5:
        return <span className="text-rare pill">Rare</span>
        break
      default:
        return <span className="text-common pill">Common</span>
    } 
  }

  const decipherNocturnal = (value) => {
    if (value === true) {
      return <span><i className="fa-solid fa-moon text-moon"></i></span>
    } else {
      return null
    }
  }

  const zeroDeleter = (value) => {
    if (value === 0) {
      return null
    } else {
      return value
    }
  }

  return (
    <div className="container-fluid">
      <div className="row justify">

      <div className="row justify mb-2">
        <div className="col-sm-8">
          <h1 className="display-7 text-white text-center">Pals</h1>

          </div>
          <div className="col-sm-4">
            <input type="text" className="form-control darkInput" id="search" placeholder="Search Pals..." onChange={handleSearch}/>
    
          </div>
        </div>
      </div>
      <table className="table table-dark table-striped sticky-thc">
        <thead>
          <tr>
            <th className="pointer" onClick={() => sorting('zukanindex')}>#</th>
            <th colSpan="2" className="pointer" onClick={() => sorting('name')}>Pal</th>
            <th><i className="fa-solid fa-moon text-moon pointer" onClick={() => sorting('nocturnal')}></i></th>
            <th className="pointer" onClick={() => sorting('rarity')}>Rarity</th>
            <th colSpan="2" className="pointer" onClick={() => sorting('elementtype1')}>Type</th>
            <th className="text-center border-right pointer"><i className="fa-solid fa-egg text-epic" onClick={() => sorting('combirank')}></i></th>
            <th className="text-center pointer"><i className="fa-solid fa-heart text-danger" onClick={() => sorting('hp')}></i></th>
            <th className="text-center pointer"><img src={process.env.PUBLIC_URL + "/images/icons/sword.png"} alt="Sword" width="18px" onClick={() => sorting('shotattack')}/></th>
            <th className="text-center border-right pointer"><i className="fa-solid fa-shield text-warning" onClick={() => sorting('defense')}></i></th>
            <th className="text-center pointer"><img src={process.env.PUBLIC_URL + "/images/icons/kindling.png"} alt="kindling" width="25px" onClick={() => sorting('worksuitabilityemitflame')}/></th>
            <th className="text-center pointer"><img src={process.env.PUBLIC_URL + "/images/icons/watering.png"} alt="watering" width="25px" onClick={() => sorting('worksuitabilitywatering')}/></th>
            <th className="text-center pointer"><img src={process.env.PUBLIC_URL + "/images/icons/planting.png"} alt="planting" width="25px" onClick={() => sorting('worksuitabilityseeding')}/></th>
            <th className="text-center pointer"><img src={process.env.PUBLIC_URL + "/images/icons/generating_electricity.png"} alt="Generating Electricity" width="25px" onClick={() => sorting('worksuitabilitygenerateelectricity')}/></th>
            <th className="text-center pointer"><img src={process.env.PUBLIC_URL + "/images/icons/handiwork.png"} alt="Handiwork" width="25px" onClick={() => sorting('worksuitabilityhandcraft')}/></th>
            <th className="text-center pointer"><img src={process.env.PUBLIC_URL + "/images/icons/gathering.png"} alt="Gathering" width="25px" onClick={() => sorting('worksuitabilitycollection')}/></th>
            <th className="text-center pointer"><img src={process.env.PUBLIC_URL + "/images/icons/deforesting.png"} alt="Deforesting" width="25px" onClick={() => sorting('worksuitabilitydeforest')}/></th>
            <th className="text-center pointer"><img src={process.env.PUBLIC_URL + "/images/icons/mining.png"} alt="Mining" width="25px" onClick={() => sorting('worksuitabilitymining')}/></th>
            <th className="text-center pointer"><img src={process.env.PUBLIC_URL + "/images/icons/medicine_production.png"} alt="Medicine Production" width="25px" onClick={() => sorting('worksuitabilityproductmedicine')}/></th>
            <th className="text-center pointer"><img src={process.env.PUBLIC_URL + "/images/icons/cooling.png"} alt="Cooling" width="25px" onClick={() => sorting('worksuitabilitycool')}/></th>
            <th className="text-center pointer"><img src={process.env.PUBLIC_URL + "/images/icons/transporting.png"} alt="Transporting" width="25px" onClick={() => sorting('worksuitabilitytransport')}/></th>
            <th className="text-center pointer"><img src={process.env.PUBLIC_URL + "/images/icons/farming.png"} alt="Farming" width="25px" onClick={() => sorting('worksuitabilitymonsterfarm')}/></th>
          </tr>
          </thead>
          <tbody>
            {regularPals.length > 0 ? (
              regularPals
              .map(regularPal => (
              <React.Fragment key={regularPal.name}>
                <tr>
                  <td>{regularPal.zukanindex}{regularPal.zukanindexsuffix}</td>
                  <td><img src={process.env.PUBLIC_URL + "/images/" + regularPal.codename + ".png"} alt={regularPal.name}width="25px" className="rounded-circle rounded-circle"/></td>
                  <td>{regularPal.name}</td>
                  <td>{decipherNocturnal(regularPal.nocturnal)}</td>
                  <td>{cleanRarity(regularPal.rarity)}</td>
                  <td>{decipherType(regularPal.elementtype1)}</td>
                  <td>{decipherType(regularPal.elementtype2)}</td>
                  <td className="text-center border-right">{regularPal.combirank}</td>
                  <td className="text-center">{regularPal.hp}</td>
                  <td className="text-center">{regularPal.shotattack}</td>
                  <td className="text-center border-right">{regularPal.defense}</td>
                  <td className="text-center">{zeroDeleter(regularPal.worksuitabilityemitflame)}</td>
                  <td className="text-center">{zeroDeleter(regularPal.worksuitabilitywatering)}</td>
                  <td className="text-center">{zeroDeleter(regularPal.worksuitabilityseeding)}</td>
                  <td className="text-center">{zeroDeleter(regularPal.worksuitabilitygenerateelectricity)}</td>
                  <td className="text-center">{zeroDeleter(regularPal.worksuitabilityhandcraft)}</td>
                  <td className="text-center">{zeroDeleter(regularPal.worksuitabilitycollection)}</td>
                  <td className="text-center">{zeroDeleter(regularPal.worksuitabilitydeforest)}</td>
                  <td className="text-center">{zeroDeleter(regularPal.worksuitabilitymining)}</td>
                  <td className="text-center">{zeroDeleter(regularPal.worksuitabilityproductmedicine)}</td>
                  <td className="text-center">{zeroDeleter(regularPal.worksuitabilitycool)}</td>
                  <td className="text-center">{zeroDeleter(regularPal.worksuitabilitytransport)}</td>
                  <td className="text-center">{zeroDeleter(regularPal.worksuitabilitymonsterfarm)}</td>
                </tr>
              </React.Fragment>
            ))            
            ) : null}
          </tbody>
        </table>
      </div>
    
  );
};

export default Dashboard;
