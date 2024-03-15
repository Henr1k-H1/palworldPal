import React, { useState, useEffect } from "react";
import Select from "react-select";

import regularPalsData from "../palsRegular.json";
import specialCombosData from "../palsSpecialCombos.json";

const BreedingCombos = () => {
  const [regularPals, setregularPals] = useState(regularPalsData);
  const [specialCombos, setSpecialCombos] = useState(specialCombosData);

  const [selectedOffspring, setSelectedOffspring] = useState('');

  const [possibleParents, setPossibleParents] = useState([]);



const allCombiranks = []

  regularPals.forEach((pal) =>
    allCombiranks.push(pal.combirank)
  )


  const findAveragePairs = () => {
    let pairs = [];
    let seen = new Set();
  
    for (let i = 0; i < allCombiranks.length; i++) {
      for (let j = i + 1; j < allCombiranks.length; j++) {
        if ((allCombiranks[i] + allCombiranks[j]) / 2 === selectedOffspring.combirank && !seen.has(`${allCombiranks[j]},${allCombiranks[i]}`)) {
            const parent1 = regularPals.find((pal) => pal.combirank === allCombiranks[i])
            const parent2 = regularPals.find((pal) => pal.combirank === allCombiranks[j])

            pairs.push([parent1, parent2])
            seen.add(`${allCombiranks[i]},${allCombiranks[j]}`);
        }
      }
    }
    const itself = regularPals.find((pal) => pal.combirank === selectedOffspring.combirank)
    pairs.unshift([itself, itself])
    return pairs;
  }

  const deterimneOffspring = () => {
    // if (selectedParent1.name === selectedParent2.name) {
    //   return calcClosestCombiRankPal()
    // }
    for (var i = 0; i < specialCombos.length; i++) {
      if (specialCombos[i].offspring === selectedOffspring.name) {
        const parent1 = regularPals.find((pal) => pal.name === specialCombos[i].parents[0])
        const parent2 = regularPals.find((pal) => pal.name === specialCombos[i].parents[1]) 
        return [[parent1, parent2]]
        break
      }
    }
      return findAveragePairs()
    }


  useEffect(() => {
    if (selectedOffspring !== "") {
      console.log(deterimneOffspring(selectedOffspring.combirank))
      setPossibleParents(deterimneOffspring(selectedOffspring.combirank))

    }
  }, [selectedOffspring])


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
        return <span className="text-legendary text-lead pill">Legendary</span>
        break
      case 10:
        return <span className="text-epic text-lead pill">Epic</span>
        break
      case 5:
        return <span className="text-rare text-lead pill">Rare</span>
        break
      default:
        return <span className="text-common text-lead pill">Common</span>
    } 
  }

  return (
    <div className="container-fluid">
      <div className="row justify">
        {regularPals.length > 0 ? (
          <React.Fragment>
            <div className="col-sm-6 col-md-4 offset-md-4 offset-sm-3">
              <h1 className="display-7 text-white text-center">Desired Offspring</h1>
              <Select
                options={regularPals}
                // getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.name}
                onChange={(e) => setSelectedOffspring(e)}
                placeholder="Select or type to search"
                isSearchable
                formatOptionLabel={option => (
                  <div className="pal-option">
                    <img src={process.env.PUBLIC_URL + "/images/" + option.codename + ".png"}
                        alt={option.name}
                        width="25px"
                        className="img-fluid rounded-circle rounded-circle"
                        />
                    <span> {option.name}</span>
                  </div>
                )}
              />
              {selectedOffspring && (
                <div className="card mt-2 outerCard">
                  <div className="card-body text-center">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/images/" +
                        selectedOffspring.codename +
                        ".png"
                      }
                      className="img-fluid rounded-circle rounded-circle-large"
                      alt={selectedOffspring.name}
                      width="75px"
                    />
                    <h1 className="display-7 text-white">{selectedOffspring.name}</h1>
                    <div className="mb-2">{cleanRarity(selectedOffspring.rarity)}</div>
                    <div>{decipherType(selectedOffspring.elementtype1)} {decipherType(selectedOffspring.elementtype2)}</div>
                  </div>
                </div>
              )}
            </div>
          </React.Fragment>
        ) : null}
      </div>

      <div className="row mt-4 mb-4">
        <div className="col">
      {possibleParents.length > 0 ? ( <h1 className="display-7 text-white text-center"> Some Possible Pairings</h1> ) : null}

        {possibleParents.length > 0 ? (
          possibleParents
          .map((parents) => (
            <React.Fragment key={parents[0].name}>
              <div className="row mb-2">
                <div className="col-md-6 offset-md-3 text-center">
                  <div className="card outerCard">
                    <div className="card-body center mt-2">

                      <div className="row">
                      <div className="col">
                    <img
                          src={
                            process.env.PUBLIC_URL +
                            "/images/" +
                            parents[0].codename +
                            ".png"
                          }
                          className="img-fluid rounded-circle rounded-circle-small"
                          alt={possibleParents.name}
                          width="50px"
                        />
                      <h1 className="display-8 text-white mt-2">{parents[0].name}</h1>
                      <div className="mb-2">{cleanRarity(parents[0].rarity)}</div>
                      <div>{decipherType(parents[0].elementtype1)} {decipherType(parents[0].elementtype2)}</div>

                      </div>
                      <div className="col">
                    <img
                          src={
                            process.env.PUBLIC_URL +
                            "/images/" +
                            parents[1].codename +
                            ".png"
                          }
                          className="img-fluid rounded-circle rounded-circle-small"
                          alt={possibleParents.name}
                          width="50px"
                        />
                      <h1 className="display-8 text-white mt-2">{parents[1].name}</h1>
                      <div className="mb-2">{cleanRarity(parents[1].rarity)}</div>
                      <div>{decipherType(parents[1].elementtype1)} {decipherType(parents[1].elementtype2)}</div>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
                </div>
            </React.Fragment>
          )
          )
        ) : null
        }
      </div>
      </div>
    </div>
  );
};

export default BreedingCombos;
