import { Button } from '@/components/ui/button';
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
} from '@/components/ui/color-picker';
import { Field } from '@/components/ui/field';
import { NumberInputField, NumberInputRoot } from '@/components/ui/number-input';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useSettings } from '@/contexts/SettingsContext';
import { createListCollection, HStack, parseColor, VStack } from '@chakra-ui/react';
import { BOND_TYPES, BondType } from '../data/Bonds';
import { StepperInput } from './ui/stepper-input';

export function Settings() {
  const { settings, updateSettings, resetSettings } = useSettings();

  return (
    <VStack align="stretch" maxHeight="50vh" overflowY="auto">
      <Field label="Zoom">
        <StepperInput
          variant="subtle"
          size="xs"
          value={`${settings.zoom * 100}`}
          min={10}
          max={100}
          step={10}
          onValueChange={({ valueAsNumber }) => updateSettings({ zoom: valueAsNumber / 100 })}
        />
      </Field>
      <Field label="Bond Type">
        <SelectRoot
          collection={bonds}
          value={[settings.bond]}
          onValueChange={(e) => updateSettings({ bond: e.value[0] as BondType })}
        >
          <SelectTrigger>
            <SelectValueText placeholder="Select bond" />
          </SelectTrigger>
          <SelectContent>
            {bonds.items.map((bond) => (
              <SelectItem item={bond} key={bond.value}>
                {bond.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
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

      <HStack>
        <Field label="Exp. Head Joint">
          <NumberInputRoot
            value={settings.brick.expectedHeadJointWidth.toString()}
            onValueChange={({ valueAsNumber }: { valueAsNumber: number }) => {
              updateSettings({
                brick: {
                  ...settings.brick,
                  expectedHeadJointWidth: isNaN(valueAsNumber) ? 10 : valueAsNumber,
                },
              });
            }}
          >
            <NumberInputField />
          </NumberInputRoot>
        </Field>

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
      </HStack>

      <Field label="Course Height">
        <NumberInputRoot
          value={settings.courseHeight.toString()}
          onValueChange={({ valueAsNumber }: { valueAsNumber: number }) => {
            updateSettings({
              courseHeight: isNaN(valueAsNumber) ? 10 : valueAsNumber,
            });
          }}
          step={0.5}
          width="100%"
        >
          <NumberInputField />
        </NumberInputRoot>
      </Field>
      <HStack>
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
      </HStack>
      <HStack>
        <Field label="Brick Shadow">
          <Switch
            checked={settings.brickShadow}
            onCheckedChange={({ checked }) => updateSettings({ brickShadow: checked })}
          />
        </Field>
        <Field label="Brick Colour By Size">
          <Switch
            checked={settings.colourBricksBySize}
            onCheckedChange={({ checked }) => updateSettings({ colourBricksBySize: checked })}
          />
        </Field>
      </HStack>

      <Button onClick={resetSettings} size="2xs">
        Reset
      </Button>
    </VStack>
  );
}

const bonds = createListCollection({
  items: Object.keys(BOND_TYPES).map((key) => ({
    label: key,
    value: key,
  })),
});
