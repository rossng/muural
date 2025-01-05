import { Field } from '@/components/ui/field';
import { NumberInputField, NumberInputRoot } from '@/components/ui/number-input';
import { Radio, RadioGroup } from '@/components/ui/radio';
import { useSettings } from '@/contexts/SettingsContext';
import { HStack, parseColor, VStack } from '@chakra-ui/react';
import { Button } from './components/ui/button';
import {
  ColorPickerArea,
  ColorPickerContent,
  ColorPickerControl,
  ColorPickerEyeDropper,
  ColorPickerInput,
  ColorPickerLabel,
  ColorPickerRoot,
  ColorPickerSliders,
  ColorPickerTrigger,
} from './components/ui/color-picker';

export function Settings() {
  const { settings, updateSettings, resetSettings } = useSettings();

  return (
    <VStack align="stretch" spaceY={4}>
      <Field label="Bond Type">
        <RadioGroup
          value={settings.bond}
          onValueChange={({ value }) => {
            updateSettings({
              bond: value as unknown as 'flemish' | 'stretcher',
            });
          }}
        >
          <VStack align="start">
            <Radio value="stretcher">Stretcher Bond</Radio>
            <Radio value="flemish">Flemish Bond</Radio>
          </VStack>
        </RadioGroup>
      </Field>

      <HStack>
        <Field label="Brick Width">
          <NumberInputRoot
            value={settings.brick.width.toString()}
            onValueChange={({ valueAsNumber }: { valueAsNumber: number }) => {
              updateSettings({
                brick: {
                  ...settings.brick,
                  width: isNaN(valueAsNumber) ? 210 : valueAsNumber,
                },
              });
            }}
          >
            <NumberInputField />
          </NumberInputRoot>
        </Field>

        <Field label="Brick Height">
          <NumberInputRoot
            value={settings.brick.height.toString()}
            onValueChange={({ valueAsNumber }: { valueAsNumber: number }) => {
              updateSettings({
                brick: {
                  ...settings.brick,
                  height: valueAsNumber,
                },
              });
            }}
          >
            <NumberInputField />
          </NumberInputRoot>
        </Field>
      </HStack>

      <Field label="Min. Head Joint">
        <NumberInputRoot
          value={settings.minHeadJointWidth.toString()}
          onValueChange={({ valueAsNumber }: { valueAsNumber: number }) => {
            updateSettings({
              minHeadJointWidth: isNaN(valueAsNumber) ? 10 : valueAsNumber,
            });
          }}
        >
          <NumberInputField />
        </NumberInputRoot>
      </Field>

      <Field label="Course Height">
        <NumberInputRoot
          value={settings.courseHeight.toString()}
          onValueChange={({ valueAsNumber }: { valueAsNumber: number }) => {
            updateSettings({
              courseHeight: isNaN(valueAsNumber) ? 10 : valueAsNumber,
            });
          }}
          step={0.5}
        >
          <NumberInputField />
        </NumberInputRoot>
      </Field>
      <Field label="Brick Colour">
        <ColorPickerRoot
          value={parseColor(settings.brick.colour)}
          onValueChange={(value) =>
            updateSettings({
              brick: {
                ...settings.brick,
                colour: value.valueAsString,
              },
            })
          }
        >
          <ColorPickerLabel />
          <ColorPickerControl>
            <ColorPickerInput />
            <ColorPickerTrigger />
          </ColorPickerControl>
          <ColorPickerContent>
            <ColorPickerArea />
            <ColorPickerEyeDropper />
            <ColorPickerSliders />
          </ColorPickerContent>
        </ColorPickerRoot>
      </Field>
      <Field label="Mortar Colour">
        <ColorPickerRoot
          value={parseColor(settings.mortarColour)}
          onValueChange={(value) =>
            updateSettings({
              mortarColour: value.valueAsString,
            })
          }
        >
          <ColorPickerLabel />
          <ColorPickerControl>
            <ColorPickerInput />
            <ColorPickerTrigger />
          </ColorPickerControl>
          <ColorPickerContent>
            <ColorPickerArea />
            <ColorPickerEyeDropper />
            <ColorPickerSliders />
          </ColorPickerContent>
        </ColorPickerRoot>
      </Field>
      <Button onClick={resetSettings} size="2xs">
        Reset
      </Button>
    </VStack>
  );
}
