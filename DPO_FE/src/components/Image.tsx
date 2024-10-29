interface  imageProp {
  url: string;
  height?: number
}
import { Gallery, Item } from 'react-photoswipe-gallery'
export default function MyImage(prop: imageProp) {
  let url = process.env.NEXT_PUBLIC_SERVER+ prop.url;
  return (
<>
  <Item
    original={url}
    // thumbnail={url}
    width="1024"
    height="768"
  >
    {({ ref, open }) => (
      <img className='me-5 ver align-top border-2 object-contain' width={300} ref={ref} onClick={open} src={url} />
    )}
  </Item>
</>
  )
}
