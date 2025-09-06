import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
  TableData,
} from '@/components/ui/table';
import { TouchableOpacity } from 'react-native';
import { Box } from '../ui/box';
import { Menu, MenuItem, MenuItemLabel } from '../ui/menu';
import { Text } from '../ui/text';
import { Icon } from '../ui/icon';

interface ColumnDef {
  key: string;
  title: string;
}

interface DataGridProps {
  data: Record<string, any>[];
  columns: ColumnDef[];
  sideColumns: ColumnDef[];
  menuItems?: any[],
  onMenuPress?: ({ player: string, value: string }) => void;
}

const DataGrid: React.FC<DataGridProps> = ({ data, columns, sideColumns, menuItems, onMenuPress }) => {
  return (
    <Box className="border border-solid border-outline-200 rounded-lg overflow-hidden w-full">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-background-50">
            <TableHead className="border-0 border-r border-solid border-outline-200">
              Position
            </TableHead>

            {columns.map((col) => (
              <TableHead key={col.key}>{col.title}</TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {sideColumns.map((sideCol, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableHead className="bg-background-50 border-0 border-solid border-r border-outline-200 font-medium">
                {sideCol.title}
              </TableHead>

              {columns.map((col, idx) => (
                <Menu
                  key={idx}
                  placement="top"
                  offset={5}
                  disabledKeys={['Settings']}
                  trigger={({ ...triggerProps }) => {
                    return (
                      <TableData
                        className="border-0 border-solid border-r border-outline-200 font-medium"
                        key={col.key}>
                        <TouchableOpacity {...triggerProps}>
                          <Text>{data?.[rowIndex]?.[col.key]}</Text>
                        </TouchableOpacity>
                      </TableData>
                    );
                  }}
                >
                  {menuItems?.length && (
                    menuItems.map((item, idx) => (
                      <MenuItem key={`${idx}-menu`} onPress={() => onMenuPress({ player: data?.[rowIndex], value: item.value })} textValue={item.value}>
                        {item.icon && (
                          <Icon as={item.icon} size="sm" className="mr-2" />
                        )}
                        <MenuItemLabel size="sm">{item.label}</MenuItemLabel>
                      </MenuItem>
                    ))
                  )}
                </Menu>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

export default DataGrid;
