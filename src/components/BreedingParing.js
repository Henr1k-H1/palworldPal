import React, { useState, useEffect } from "react";
import Select from "react-select";

import regularPalsData from "../palsRegular.json";
import specialCombosData from "../palsSpecialCombos.json";

const BreedingParing = () => {
  const [regularPals, setregularPals] = useState(regularPalsData);
  const [specialCombos, setSpecialCombos] = useState(specialCombosData);

  const [selectedParent1, setSelectedParent1] = useState("");
  const [selectedParent2, setSelectedParent2] = useState("");

  const [offspring, setOffspring] = useState("");

 const calcClosestCombiRankPal = () => {
      const offspringCombirank =
      (selectedParent1.combirank + selectedParent2.combirank) / 2;
      return regularPals.reduce((a, b) =>
      Math.abs(a.combirank - offspringCombirank) <
      Math.abs(b.combirank - offspringCombirank)
        ? a
        : b
    )
  }

   const deterimneOffspring = () => {
    if (selectedParent1.name === selectedParent2.name) {
      return calcClosestCombiRankPal()
    }
    for (var i = 0; i < specialCombos.length; i++) {
      if (specialCombos[i].parents.includes(selectedParent1.name) && specialCombos[i].parents.includes(selectedParent2.name)) {
        return regularPals.find((pal) => pal.name === specialCombos[i].offspring)
        break
      }
    }
      return calcClosestCombiRankPal()
    }

  useEffect(() => {
    if (selectedParent1 !== "" && selectedParent2 !== "") {
      setOffspring(deterimneOffspring())
    }
  }, [selectedParent1, selectedParent2])


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
            <div className="col-sm-6 col-md-3 offset-md-3">
              <h1 className="display-7 text-white">First Parent</h1>
              <Select
                options={regularPals}
                // getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.name}
                onChange={(e) => setSelectedParent1(e)}
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
              {selectedParent1 && (
                <div className="card mt-2 outerCard">
                  <div className="card-body text-center">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/images/" +
                        selectedParent1.codename +
                        ".png"
                      }
                      className="img-fluid rounded-circle rounded-circle-small"
                      alt={selectedParent1.name}
                      width="50px"
                    />
                    <h1 className="display-8 text-white">{selectedParent1.name}</h1>
                    <div className="mb-2">{cleanRarity(selectedParent1.rarity)}</div>
                    <div>{decipherType(selectedParent1.elementtype1)} {decipherType(selectedParent1.elementtype2)}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="col-sm-6 col-md-3">
              <h1 className="display-7 text-white">Second Parent</h1>
              <Select
                options={regularPals}
                // getOptionLabel={(option) => option.name }
                getOptionValue={(option) => option.name}
                onChange={(e) => setSelectedParent2(e)}
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
              {selectedParent2 && (
                <div className="card mt-2 outerCard">
                  <div className="card-body text-center">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/images/" +
                        selectedParent2.codename +
                        ".png"
                      }
                      className="img-fluid rounded-circle rounded-circle-small"
                      alt={selectedParent2.name}
                      width="50px"
                    />
                    <h1 className="display-8 text-white">{selectedParent2.name}</h1>
                    <div className="mb-2">{cleanRarity(selectedParent2.rarity)}</div>
                    <div>{decipherType(selectedParent2.elementtype1)} {decipherType(selectedParent2.elementtype2)}</div>
                  </div>
                </div>
              )}
            </div>
          </React.Fragment>
        ) : null}
      </div>

      <div className="row mt-4 mb-4">
        {offspring && (
          <div className="col-md-6 offset-md-3 text-center">
            <h1 className="display-7 text-white">Offspring</h1>
            <div className="row mt-3">
              <div className="col">
                <div className="card outerCard">
                  <div className="card-body center mt-2">
                  <img
                        src={
                          process.env.PUBLIC_URL +
                          "/images/" +
                          offspring.codename +
                          ".png"
                        }
                        className="img-fluid rounded-circle rounded-circle-large"
                        alt={offspring.name}
                        width="75px"
                      />
                    <h1 className="display-7 text-white mt-2">{offspring.name}</h1>
                    <div className="mb-2">{cleanRarity(offspring.rarity)}</div>
                    <div>{decipherType(offspring.elementtype1)} {decipherType(offspring.elementtype2)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BreedingParing;
