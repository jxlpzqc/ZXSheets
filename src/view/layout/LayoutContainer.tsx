import * as React from 'react';

export interface ILayoutContainerProps {
  type: 'row' | 'column',
  count: number,
  /**
   * 值的数组
   * 元素为三种形式
   * - 10px
   * - 10%
   * - auto
   * - auto2
   */
  values: string[]
}

export const LayoutContainer: React.FC<ILayoutContainerProps> = (props) => {

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: props.type,
    flexWrap: 'nowrap',
    width: '100%',
    height: '100%'
  };

  const getElementStyle = (length: string) => {

    const ret: React.CSSProperties = {
      margin: 0,
      padding: 0
    }

    if (length == 'auto') {
      let grow = 1;
      if (length.length > 4) {
        const p = parseInt(length.substring(4, length.length))
        if (isNaN(grow)) {
          grow = p;
        }
      }
      ret.flexGrow = grow;
    }
    else {
      if (props.type == 'row') {
        ret.width = length
      }
      else {
        ret.height = length;
      }
    }

    return ret;
  }

  return (
    <div style={containerStyle}>
      {React.Children.map(props.children, (u, index) => (
        <div style={getElementStyle(props.values[index])}>
          {u}
        </div>
      ))}
    </div>
  );
}

