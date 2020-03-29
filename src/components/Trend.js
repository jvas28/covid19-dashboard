import React,{useEffect, useRef} from 'react'
import { trendOptions } from '../services/charts'
import echarts from 'echarts';
export default function Trend({data=[]}) {
    const el = useRef();
    useEffect(() => {
        if(el && el.current) {
            const options = trendOptions(echarts, data);
            let instance = echarts.getInstanceByDom(el.current);
            // initialize chart
            if(instance === undefined) {
                instance = echarts.init(el.current);
                instance.setOption(options);
                window.onresize = () => instance.resize();
            }
            instance.setOption(options);  
        }
        console.log(data);
    }, [data, el])
    return (
        <div style={{width: "100%", height:"250px"}} ref={el} >
            
        </div>
    )
}
