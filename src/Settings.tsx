import { Field } from '@/components/ui/field';
import { NumberInputField, NumberInputRoot } from '@/components/ui/number-input';
import { Radio, RadioGroup } from '@/components/ui/radio';
import { useSettings } from '@/contexts/SettingsContext';
import { HStack, VStack } from '@chakra-ui/react';
import { Button } from './components/ui/button';

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
      <Button onClick={resetSettings} size="2xs">
        Reset
      </Button>
    </VStack>
  );
}
