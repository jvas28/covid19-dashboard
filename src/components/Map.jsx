import React, {useEffect, useRef} from 'react'
import { getCoordMap, getCountryByName } from '../services/countries';
import { mapOptions } from '../services/charts'
import echarts from 'echarts/dist/echarts';
import world from 'echarts/map/json/world';
echarts.registerMap('world', world);
const Map =  ({data, coordinates, selected}) => {
    const el = useRef();
    const geoCoordMap = getCoordMap();
    const getOption = mapOptions
    useEffect(()=>{
        if(el && el.current) {
            const options = getOption(coordinates, data, geoCoordMap);
            let instance = echarts.getInstanceByDom(el.current);
            // initialize chart
            if(instance === undefined) {
                instance = echarts.init(el.current);
                instance.setOption(options);
                window.onresize = () => instance.resize();
            }
            instance.setOption(options);  
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data, coordinates]);
    useEffect(()=>{
        const country = getCountryByName(selected);
        if(country) {
            let { latitude, longitude} = country;
            latitude =  parseFloat(latitude);
            longitude =  parseFloat(longitude);
            const options = getOption([longitude, latitude], data, geoCoordMap);
            let instance = echarts.getInstanceByDom(el.current);
            instance.setOption(options);  
        }
        

    },[data, geoCoordMap, getOption, selected]);
    
    return (
        <div ref={el}  style={{width: '100%', height: '100vh'}}>
        </div>
    )
}
export default Map;