import * as colorPicker from "@zag-js/color-picker"
import { Portal, normalizeProps, useMachine } from "@zag-js/react"
import { useId } from "react"
import "./ColourPicker.css"

const Show = (props) => {
  const { when, children } = props
  return when ? <>{children}</> : null
}

export default function ColorPicker(props) {
  const service = useMachine(colorPicker.machine, {
    id: useId(),
    defaultValue: colorPicker.parse(props.defaultValue).toFormat("rgba"),
    ...props.controls,
    format: "rgba",
    name: props.name,
  })

  const api = colorPicker.connect(service, normalizeProps)

  return (
    <div id="picker" {...api.getRootProps()}>
      {/* <label {...api.getLabelProps()}>
        <span>{props.label}</span>
      </label> */}

      <div {...api.getControlProps()}>
        <div>
          <button {...api.getTriggerProps()}>
            <div {...api.getTransparencyGridProps({ size: "10px" })} />
            <div {...api.getSwatchProps({ value: api.value })} />
          </button>
        </div>
        <input name={props.name} {...api.getChannelInputProps({ channel: "hex" })} />
      </div>

      <Portal>
        <div {...api.getPositionerProps()}>
          <div {...api.getContentProps()}>
            <div>
              <div {...api.getAreaProps()}>
                <div {...api.getAreaBackgroundProps()} />
                <div {...api.getAreaThumbProps()} />
              </div>

              <div>
                <div>
                  <div {...api.getChannelSliderProps({ channel: "hue" })}>
                    <div
                      {...api.getChannelSliderTrackProps({ channel: "hue" })}
                    />
                    <div
                      {...api.getChannelSliderThumbProps({ channel: "hue" })}
                    />
                  </div>

                  <div {...api.getChannelSliderProps({ channel: "alpha" })}>
                    <div {...api.getTransparencyGridProps({ size: "12px" })} />
                    <div
                      {...api.getChannelSliderTrackProps({ channel: "alpha" })}
                    />
                    <div
                      {...api.getChannelSliderThumbProps({ channel: "alpha" })}
                    />
                  </div>
                </div>
              </div>


              <Show when={api.format.startsWith("rgb")}>
                <div>
                  <div>
                    <input {...api.getChannelInputProps({ channel: "red" })} />
                    <span>R</span>
                  </div>
                  <div>
                    <input
                      {...api.getChannelInputProps({ channel: "green" })}
                    />
                    <span>G</span>
                  </div>
                  <div>
                    <input {...api.getChannelInputProps({ channel: "blue" })} />
                    <span>B</span>
                  </div>
                  <div>
                    <input
                      {...api.getChannelInputProps({ channel: "alpha" })}
                    />
                    <span>A</span>
                  </div>
                </div>
              </Show>

              
            </div>
          </div>
        </div>
      </Portal>
    </div>
  )
}
