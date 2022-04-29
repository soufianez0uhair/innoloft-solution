import {useState, useEffect} from 'react'


import {ImLocation} from 'react-icons/im'
import {HiOutlineSwitchHorizontal} from 'react-icons/hi'

import Gmaps from '../components/Gmaps'

import {useParams} from 'react-router-dom'

export default function Product() {
  const num = useParams().num;
  const [product, setProduct] = useState({
    title: '',
    type: '',
    description: '',
    attributes: [],
    trl: '',
    userName: '',
    userImg: '',
    company: '',
    address: {},
  })
  const [id, setId] = useState(Math.floor(Math.random() * 10000))
  const [attribute, setAttribute] = useState({
    'id': '',
    'name': ''
  })
  const [isDesc, setIsDesc] = useState(true)
  const [trls, setTrls] = useState([])
  const [showMap, setShowMap] = useState(false)
  function handleChange(e) {
    const {name, value} = e.target;
    setProduct(prevProduct => {
      if(name === 'description' || name === 'trl') {
        return {
          ...prevProduct,
          [name]: value
        }
      }
      for(let i = 0; i < prevProduct.attributes.length; i++) {
        if(prevProduct.attributes[i].id == name) {
          let attributes2 = [...prevProduct.attributes]
          attributes2[i].name = value
          return {
            ...prevProduct,
            attributes: attributes2
          }
        }
      }
    })
  }
  function initialProduct(x) {
      return {
        'title': x.name,
        'type': x.type.name,
        'description': x.description,
        'picture': x.picture,
        'attributes': [...x.categories, ...x.businessModels],
        'trl': x.trl.name,
        'userName': x.user.firstName + '' + x.user.lastName,
        'userImg': x.user.profilePicture,
        'company': x.company.name,
        'address': x.company.address,
      }
  }
  useEffect(() => {
    fetch(`https://api-test.innoloft.com/product/${num}/`)
      .then(res => res.json())
      .then(data => initialProduct(data))
      .then(prod => {
        setProduct(prod);
        setShowMap(true)
      })
    }, [])
  useEffect(() => {
    fetch('https://api-test.innoloft.com/trl/')
    .then(res => res.json())
    .then(data => setTrls(data))
  }, [])
  function newAttribute(e) {
    const {value} = e.target;
    setAttribute(prevAttribute => {
      return {
        'id': id,
        name: value
      }
    })
  }
  function addAttribute(e) {
    e.preventDefault();
    let attributes2 = [...product.attributes];
    attributes2.push(attribute);
    setProduct(prevProduct => {
      setId(Math.floor(Math.random() * 10000))
      setAttribute(prevAttribute => {
        return {
          ...prevAttribute,
          'name': ''
        }
      })
      return {
        ...prevProduct,
        attributes: attributes2
      }
    })
  }
  function handleIsDesc(e) {
    setIsDesc(prevIsDesc => e.target.innerHTML == 'Description' ? true : false)
  }
  
    return (
        <section className="product">
            <div className="product-info">
              <div className="product__img">
                  <img src={product.picture} alt="product img" />
              </div>
              <div className="product__address">
                <ImLocation className="icon--location" /> <span>{product.address.city && product.address.city.name}, {product.address.country && product.address.country.name}</span>
              </div>
              <div className="product__main-info">
                <h1>{product.title}</h1>
                <h3><i>{product.type}</i></h3>
              </div>
              <div className="product__switch">
                <button className="btn--description" onClick={(e) => handleIsDesc(e)}>Description</button>
                <button className="btn--attributes" onClick={(e) => handleIsDesc(e)}>Attributes</button>
                <HiOutlineSwitchHorizontal className="icon--switch" />
              </div>
              <div className="product__tab-content">
                {isDesc ? 
                 <textarea className="input--description" onChange={(e) => handleChange(e)} name="description" value={product.description}></textarea>
                 :
                 <div className="attributes-tab">
                   <div className="attributes">
                   {product.attributes.map(attribute => (
                     <input type="text" key={attribute.id} onChange={(e) => handleChange(e)} className="input--attribute" name={attribute.id} value={attribute.name} />
                   ))}
                   </div>
                   <form onSubmit={(e) => addAttribute(e)} className="add-attribute">
                     <input onChange={(e) => newAttribute(e)} type="text" className="input--add-attribute" value={attribute.name} />
                     <button className="btn--add-attribute">ADD</button>
                   </form>
                   <select name="TRL" className="trls">
                     {trls.map(trl => {
                       return (
                         <option 
                         onChange={(e) => handleChange(e)}
                           value={trl.name}
                         >{trl.name}</option>
                       )
                     })}
                    </select>
                  </div>
                }
              </div>
            </div>
            <div className="user">
                <img src="https://img.innoloft.com/users/user_8d48197d.png" alt="user img"/>
                <div className="user-info">
                    <p className="user__name">Christopher Stirner</p>
                    <p className="user__company">Innoloft GmbH</p>
                </div>
            </div>
              <div className="gmaps">
                 {showMap && <Gmaps len={product.address.longitude} lat={product.address.latitude} />}
              </div>
        </section>
    )
}